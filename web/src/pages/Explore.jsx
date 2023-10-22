import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import React from 'react'
import Slider from '../components/Slider'

function ExplorePage() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        <Slider />

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Place for rent</p>
          </Link>

          <Link to='/category/sale'>
            <img src={sellCategoryImage} alt="sale" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Place for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default ExplorePage
