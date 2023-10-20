import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import shareIcon from '../assets/svg/shareIcon.svg'
import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Map from '../components/Map';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

/*
@todo
1. fix height issue with SwiperSlide

*/

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sharedLinkCopied, setSharedLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      } else {
        console.log("No such document!");
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
      <Swiper slidesPerView={1}
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover',
                height: '30vh',
              }}
              className="swiperSlideDiv">
            </div>
          </SwiperSlide>

        ))}
      </Swiper>

      <div className="shareIconDiv" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setSharedLinkCopied(true)
        setTimeout(() => {
          setSharedLinkCopied(false)
        }, 2000)
      }}>
        <img src={shareIcon} alt='' />
      </div>

      {sharedLinkCopied && <p className='linkCopied'> Link copied!</p>}

      <div className="listingDetails">
        <p className="listingName">{listing.name} - ${listing.offer
          ? listing.discountedPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : listing.regularPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>

        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            ${(listing.regularPrice - listing.discountedPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} OFF
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
          </li>
          <li>
            {listing.parking && `Parking Spot`}
          </li>
          <li>
            {listing.furnished && `Furnished`}
          </li>
        </ul>

        <p className="listingLocationTitle">Location</p>
        <Map lat={listing.geolocation.lat} lng={listing.geolocation.lng} location={listing.location} />

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}
            className='primaryButton'>Contact Landord
          </Link>
        )}
      </div>
    </main>
  )
}

export default Listing
