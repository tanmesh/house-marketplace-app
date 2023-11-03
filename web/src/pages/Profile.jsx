import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from "../components/ListingItem";

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [changeDetails, setChangeDetails] = useState(false)
  // eslint-disable-next-line
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleLogOut = () => {
    auth.signOut()
    navigate('/')
  }

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, 'listings')

      const q = query(listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'))

      const querySnap = await getDocs(q)

      const listings = []
      querySnap.forEach((doc) => {
        if (doc.data().sold === false) {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        }
      })
      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [auth.currentUser.uid])

  const onChange = (e) => {
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [e.target.id]: e.target.value,
    // }
    // ))
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.user === formData.user) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)

        await updateDoc(userRef, {
          name: formData.name
        })
      }
    } catch (error) {
      toast.error('Couldnt update!')
    }
  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteDoc(doc(db, 'listings', listingId))
        const updatedListings = listings.filter((listing) => listing.id !== listingId)
        setListings(updatedListings)
        toast.success('Successfully deleted the listing!')
      } catch (error) {
        toast.error('Couldnt delete!')
      }
    }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
      </header>

      <main className="profileMain">
        {/* <div className="headerCard">
          <div className="profileDetailsHeader">
            <p className="personalDetailsText">Personal Details</p>
            <p className="changePersonalDetails" onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}>
              {changeDetails ? 'done' : 'change'}
            </p>
          </div>
        </div> */}

        <div className="profileDetailMain">
          <div className="profileCard">
            <form>
              <div className="formLabelInputDiv">
                <label className="formLabel">Name: </label>
                <input type="text" id='name'
                  className={!changeDetails ? 'profileName' : 'profileNameActive'}
                  disabled={!changeDetails} value={formData.name} onChange={onChange} />
              </div>

              <div className='formLabelInputDiv'>
                <label className="formLabel">Email Id: </label>
                <input type="text" id='email'
                  className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                  disabled={!changeDetails} value={formData.email} onChange={onChange} />
              </div>

            </form>
          </div>
        </div>

        <div className='createListingMain'>
          <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt="home" />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt="arrow right" />
          </Link>
        </div>

        {!loading && listings?.length > 0 && (
          <div className="listingTextMain">
            <p className="listingText">My listings</p>
            <ul className="listingList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)} />
              ))}
            </ul>
          </div>
        )}
      </main>

      <button type='button' className="logOut" onClick={handleLogOut}>Log Out</button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default Profile
