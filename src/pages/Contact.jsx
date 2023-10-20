import React, { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

/*
@todo
1. fix mail bug
*/

function Contact() {
    const [message, setMessage] = useState('')
    const [landlord, setLandlord] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchLandlord = async () => {
            const docRef = doc(db, 'users', params.landlordId)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                toast.error('Landlord doesnt exist!')
            }
            setLandlord(docSnap.data())
        }

        fetchLandlord()
    }, [params.landlordId])

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className="pageContainer">
            <p className="pageHeader">
                Contact Landlord
            </p>

            {landlord !== null && (
                <main>
                    <div className="contactLandlord">
                        <p className="landlordName">
                            Contact {landlord?.name}
                        </p>
                    </div>

                    <form className="formMessage">
                        <div className="messageDiv">
                            <label htmlFor="message" className="messageLabel">Message</label>
                            <textarea name="message" id="message" className='textarea'
                                value={message} onChange={onChange}></textarea>
                        </div>

                        {/* <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button type='button' className="primaryButton">Send message</button>
                        </a> */}

                        <a href='mailto:tanmeshnm@gmail.com?Subject=Yo&body=yoyo'>
                            <button type='button' className="primaryButton">Send message</button>
                        </a>
                    </form>
                </main>
            )}
        </div>
    )
}

export default Contact
