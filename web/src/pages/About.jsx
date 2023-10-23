import React from 'react'

function About() {
  return (
    <>
      <div className="about">
        <header className="profileHeader">
          <p className="pageHeader">About this project</p>
        </header>
      </div>

      <div className='aboutMain'>
        <div className="aboutCard">
          <p>The House Marketplace App is a Progressive Web App (PWA) designed and developed using React and Tailwind CSS.
            It serves as a platform for streamlined property listing, whether for rental or sale of residential properties.
            This documentation outlines the primary features and architecture of the app.</p>

          <p>The House Marketplace App offers a variety of features for property listing and management:</p>
          <ul>
            <li><strong>User Authentication:</strong> Secure access to the platform is ensured through Google Auth.</li>
            <li><strong>Property Listings:</strong> Users can create, edit, and manage property listings, including details like images, property type, location, price, and description.</li>
            <li><strong>Geolocation:</strong> Users can easily find properties near their current location, enhancing their experience.</li>
            <li><strong>Dynamic Animations:</strong> The app includes dynamic animations for an engaging and interactive user interface.</li>
            <li><strong>Payment Integration:</strong> Stripe is integrated for secure payment processing, allowing users to make payments for property listings and services.</li>
            <li><strong>Real-time Updates:</strong> Firebase backend is utilized for secure data storage and real-time updates, ensuring a responsive and dynamic user interface.</li>
          </ul>


          <p>
            Find more about on{' : '}
            <a href="https://github.com/tanmesh/house-marketplace-app"
              className='aboutLink'>
              Github
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default About
