import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  // const onChange = (e) => {
  //     setFormData((prevState) => ({
  //         ...prevState,
  //         email: e.target.email,
  //         password: e.target.password
  //     }))
  // }

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

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad credentials!')
    }

    setFormData({
      email: '',
      password: '',
    })
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!!</p>
        </header>

        <form onSubmit={onSubmit}>
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

          <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>

          <Link to='/sign-up' className='registerLink'>New user? Sign Up here</Link>
        </form>

        {/* Google OAuth  */}
      </div>
    </>
  )
}

export default SignIn
