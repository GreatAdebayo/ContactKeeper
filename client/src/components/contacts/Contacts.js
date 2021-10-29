import React, { useContext, Fragment, useEffect } from 'react'
import contactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layouts/Spinner'
const Contacts = () => {
    const { contacts, filtered, getContact, loading } = useContext(contactContext)
    useEffect(() => {
        getContact();
        // eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please Add a Contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? <> {filtered !== null ? filtered.map(filter => (
                <ContactItem contact={filter} key={filter._id} />
            ))
                : contacts.map(contact => (
                    <ContactItem contact={contact} key={contact._id} />
                ))}</> : <Spinner />}


        </Fragment>
    )
}

export default Contacts

