import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

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

export default function CheckoutForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),

        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post('http://localhost:4000/payment', {
                    amount: 1000,
                    id
                })

                if (response.data.success) {
                    console.log('Successful payment')
                    toast.success('Payment successful!')
                    setSuccess(true)
                }
            } catch (error) {
                console.log('Error', error)
                toast.error('Payment failed')
            }
        } else {
            console.log('Error', error.message)
            toast.error('Payment failed')
        }
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
