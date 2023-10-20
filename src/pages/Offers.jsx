import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import React from 'react'
import ListingItem from '../components/ListingItem';

function Offers() {
    const [listings, setListings] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const listingRef = collection(db, 'listings')

                // Create a query
                const q = query(listingRef,
                    where('offer', '==', true),
                    orderBy('timestamp', 'desc'),
                    limit(10))

                // Execute query
                const querySnap = await getDocs(q)

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
    }, [])

    return (
        <div className="category">
            <header>
                <p className="pageHeader">Offers</p>
            </header>

            {loading
                ? <Spinner />
                : (listings && listings.length > 0
                    ? (
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
                    )
                    : <p>There are no current offers.</p>
                )
            }
        </div>
    )
}

export default Offers
