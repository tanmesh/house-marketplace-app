import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import React from 'react'
import ListingItem from '../components/ListingItem';

function Category() {
    const [listings, setListings] = useState()
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const listingRef = collection(db, 'listings')

                // Create a query
                const q = query(listingRef,
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10))

                // Execute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)

                const listings = []
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Could not fetch listings.')
            }
        }

        fetchListings()
    }, [params.categoryName])

    // pagination / load more
    const onFetchMoreListings = async () => {
        try {
            // Get reference
            const listingRef = collection(db, 'listings')

            // Create a query
            const q = query(listingRef,
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(10))

            // Execute query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchedListing(lastVisible)

            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })

            setListings((prevState) => [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            toast.error('Could not fetch listings.')
        }
    }

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent'
                        ? 'Places for rent'
                        : 'Places for sale'}
                </p>
            </header>

            {loading
                ? <Spinner />
                : (listings && listings.length > 0
                    ? (
                        <>
                            <main>
                                <ul className="cateogryListings">
                                    {listings.map((listing) => (
                                        <ListingItem
                                            id={listing.id}
                                            listing={listing.data}
                                            key={listing.id} />
                                    ))}
                                </ul>
                            </main>

                            <br />
                            <br />

                            {lastFetchedListing && (
                                <button
                                    className="loadMore"
                                    onClick={onFetchMoreListings}>
                                    Load more
                                </button>
                            )
                            }
                        </>

                    )
                    : <p>No listing for {params.categoryName}</p>
                )
            }
        </div>
    )
}

export default Category
