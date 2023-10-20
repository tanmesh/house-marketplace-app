import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingRef = collection(db, 'listings')

            const q = query(listingRef,
                orderBy('timestamp', 'desc'),
                limit(5))

            const querySnap = await getDocs(q)

            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            console.log(listings)
            setListings(listings)
            setLoading(false)
        }

        fetchListings()
    }, [])

    if (loading) {
        return <Spinner />
    }

    if (listings.length === 0) {
        return (<></>)
    }

    return listings && (
        <>
            <p className="exploreHeading">Recommended</p>

            <Swiper slidesPerView={1}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}>
                {listings.map(({ data, id }) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <div
                            style={{
                                background: `url(${data.imgUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover',
                                height: '30vh',
                            }}
                            className="swiperSlideDiv">

                            <p className='swiperSlideText'> {data.name} </p>
                            <p className="swiperSlidePrice">
                                ${data.discountedPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    ?? data.regularPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                {' '}
                                {data.type === 'rent' && ' / Month'}

                            </p>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>
        </>
    )
}

export default Slider
