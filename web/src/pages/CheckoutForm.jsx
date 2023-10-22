import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner
    from '../components/Spinner';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function CheckoutForm({ formData, listingId, amount }) {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),

        })

        if (!error) {
            try {
                setLoading(true)

                const { id } = paymentMethod
                const response = await axios.post('http://localhost:4000/payment', {
                    amount: amount * 100,
                    id
                })

                if (response.data.success) {
                    formData.sold = true

                    const docRef = doc(db, 'listings', listingId)
                    await updateDoc(docRef, formData)

                    console.log('Successful payment')
                    toast.success('Payment successful!')
                    setSuccess(true)
                }
                
                setLoading(false)
            } catch (error) {
                console.log('Error', error)
                toast.error('Payment failed')
            }
        } else {
            console.log('Error', error.message)
            toast.error('Payment failed')
            
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="stripeDetailsMain">
            <div className='stripeCard'>
                {!success
                    ?
                    <form onSubmit={handleSubmit}>
                        <fieldset className="FormGroup">
                            <div className="FormRow">
                                <CardElement options={CARD_OPTIONS} />
                            </div>
                        </fieldset>

                        <button className='stripeButton'>
                            Pay
                        </button>
                    </form>
                    :
                    <div>
                        <h2>Payment successful!</h2>
                    </div>
                }
            </div>
        </div>
    );
};
