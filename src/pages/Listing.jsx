import { useNavigate, useParams } from 'react-router-dom'
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import shareIcon from '../assets/svg/shareIcon.svg'
import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import Spinner from '../components/Spinner';

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
        console.log(listing)
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
    <>

    </>
  )
}

export default Listing
