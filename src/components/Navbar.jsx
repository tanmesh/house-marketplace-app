import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/svg/personOutlineIcon.svg'

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
          <li className="navbarListItem" onClick={() => navigate('/offer')}>
            <OfferIcon fill={fillHelper('/offer')} className='navbarListItemStyle' />
            <p className={nameHelper('/offer')}>Offers</p>
          </li>

          <li className="navbarListItem" onClick={() => navigate('/')} >
            <ExploreIcon fill={fillHelper('/')} className='navbarListItemStyle' />
            <p className={nameHelper('/')}>Explore</p>
          </li>

          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <ProfileIcon fill={fillHelper('/profile')} className='navbarListItemStyle' />
            <p className={nameHelper('/profile')}>
              Profile
              {/* {userName ? `${userName}` : 'Profile'} */}
              {/* @todo using session to display Username instead of Profile */}
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar



