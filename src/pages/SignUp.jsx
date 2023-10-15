import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { username, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: username,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')

    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input type="text" className="nameInput"
            placeholder='Name' id='username' value={username}
            onChange={onChange} />

          <input type="email" className="emailInput"
            placeholder='Email' id='email' value={email}
            onChange={onChange} />

          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'}
              className='passwordInput' placeholder='Password'
              id='password' value={password}
              onChange={onChange} />

            <img src={visibilityIcon} alt='show password' className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>

          <Link to='/sign-in' className='registerLink'>Go back to Sign In</Link>
        </form>

        {/* Google OAuth  */}
      </div>
    </>
  )
}

export default SignUp