import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/svg/personOutlineIcon.svg'
import React from 'react'


function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const fillHelper = (route) => {
    return (route === location.pathname) ? '#2c2c2c' : '#8f8f8f'
  }

  const nameHelper = (route) => {
    return (route === location.pathname)
      ? 'navbarListItemNameActive'
      : 'navbarListItemName'
  }

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <OfferIcon fill={fillHelper('/offer')} width='36px' height='36px' onClick={() => navigate('/offer')} />
            <p className={nameHelper('/offer')}>Offers</p>
          </li>

          <li className="navbarListItem">
            <ExploreIcon fill={fillHelper('/')} width='36px' height='36px' onClick={() => navigate('/')} />
            <p className={nameHelper('/')}>Explore</p>
          </li>

          <li className="navbarListItem">
            <ProfileIcon fill={fillHelper('/profile')} width='36px' height='36px' onClick={() => navigate('/profile')} />
            <p className={nameHelper('/profile')}>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar



