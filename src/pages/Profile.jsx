import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import { Link, useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()

  const navigate = useNavigate()

  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  // const [name, email] = formData

  const handleLogOut = () => {
    auth.signOut()
    navigate('/')
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }
    ))
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

  const handleCreateListing = () => {
    navigate('/create-listing')
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type='button' className="logOut" onClick={handleLogOut}>Log Out</button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input type="text" id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails} value={formData.name} onChange={onChange} />

            <input type="text" id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails} value={formData.email} onChange={onChange} />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  )

}

export default Profile
