import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import { useNavigate } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import React from 'react'

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

  const onSubmit = () => {
    console.log(123)
  }
  return (
    <div className="profile">
      <header className="profileHeader flex">
        <p className="pageHeader">My Profile</p>
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
          <div className="profileName">Name: {formData.name}</div>
        </div>

        <div className="profileCard flex">
          <div className="profileEmail">Email: {formData.email}</div>
          <EditIcon width='15px' height='15px' />
        </div>
      </main>

      <button type='button' className="logOut" onClick={handleLogOut}>Log Out</button>
    </div>
  )

}

export default Profile
