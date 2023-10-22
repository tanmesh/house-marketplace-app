import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import Spinner from '../components/Spinner';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

function Booking() {
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState(null)
    const [amount, setAmount] = useState(0.00)

    const stripePromise = loadStripe('pk_test_51O3r5sKDwLQxxwC9qaa2Yk6o2CsO6cwn6upEClh124OqY1FqILbZTrqdjIxdxFr9D939mXJy9jAxvfNmo4UWjk8M00bC9BD5ZI');

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setFormData(docSnap.data())
                const data = docSnap.data()
                setAmount(data.offer
                    ? parseFloat(data.offerPrice)
                    : parseFloat(data.regularPrice))
                setLoading(false)
            } else {
                console.log("No such document!");
            }
        }
        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="booking">
            <header>
                <p className="pageHeader">Booking confirmation page</p>
            </header>

            <main className='bookingDetailsMain'>
                <div className="bookingCard">
                    <form>
                        <div className='formLabelInputDiv'>
                            <label htmlFor="name" className='booking'>Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                disabled={true}
                                style={{ width: '100%' }}
                                className='booking'
                            />
                        </div>
                        <div className='formLabelInputDiv'>
                            <label htmlFor="bathrooms" className='booking'>Bathrooms:</label>
                            <input
                                type="text"
                                id="bathrooms"
                                value={formData.bathrooms}
                                disabled={true}
                                style={{ width: '100%' }}
                                className='booking'
                            />
                        </div>
                        <div className='formLabelInputDiv'>
                            <label htmlFor="bedrooms" className='booking'>Bedrooms:</label>
                            <input
                                type="text"
                                id="bedrooms"
                                value={formData.bedrooms}
                                disabled={true}
                                style={{ width: '100%' }}
                                className='booking'
                            />
                        </div>
                        <div className='formLabelInputDiv'>
                            <label htmlFor="furnished" className='booking'>Furnished:</label>
                            <input
                                type="text"
                                id="furnished"
                                value={formData.furnished ? "Yes" : "No"}
                                disabled={true}
                                style={{ width: '100%' }}
                                className='booking'
                            />
                        </div>
                        <div className='formLabelInputDiv'>
                            <label htmlFor="location" className='booking'>Address:</label>
                            <input
                                type="text"
                                id="location"
                                value={formData.location}
                                disabled={true}
                                style={{ width: '100%' }}
                                className='booking'
                            />
                        </div>
                        <div className='formLabelInputDiv'>
                            <label htmlFor="regularPrice" className='booking'>
                                Price:
                            </label>
                            <input
                                type="text"
                                id="regularPrice"
                                value={amount}
                                disabled={true}
                                style={{ width: '100%' }}
                                className='booking'
                            />
                        </div>
                    </form>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm formData={formData} listingId={params.listingId} amount={amount} />
                </Elements>
            </main>
        </div>
    )
}

export default Booking
