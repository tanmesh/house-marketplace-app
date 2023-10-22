import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import React from 'react'

function ListingItem({ listing, id, onDelete, onEdit }) {
    return (
        <li className="categoryListing">
            <Link
                to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'>

                <div className='categoryListingImgDiv'>
                    <img src={listing.imgUrls[0]} alt={listing.name}
                        className='categoryListingImg' />
                </div>
            </Link>

            <div className="categoryListingDetailsDiv">
                <Link to={`/category/${listing.type}/${id}`}>
                    <div className="categoryListingDetails">
                        <p className="categoryListingLocation">{listing.location}</p>
                        <p className="categoryListingName">{listing.name}</p>
                        <div className='something'>
                            <p className="categoryListingPrice">
                                ${listing.offer
                                    ? listing.discountedPrice
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    : listing.regularPrice
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                {listing.type === 'rent' && ' / Month'}
                            </p>

                            <div className="categoryListingInfoDiv">
                                <div className='bedBathIcon'>
                                    <img src={bedIcon} alt="bed" />
                                    <p className="categoryListingInfoText">
                                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                                    </p>
                                </div>

                                <div className='bedBathIcon'>
                                    <img src={bathtubIcon} alt="bathtub" />
                                    <p className="categoryListingInfoText">
                                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='iconDiv'>
                    <div className='icon' onClick={() => onDelete(listing.id, listing.name)}>
                        {onDelete && (
                            <DeleteIcon className='removeIcon' fill='rgb(231, 76, 60' />
                        )}
                    </div>
                    <div className="icon" onClick={() => onEdit(listing.id)}>
                        {onEdit && (
                            <EditIcon className='editIcon' />
                        )}
                    </div>
                </div>
            </div>


        </li>
    )
}

export default ListingItem
