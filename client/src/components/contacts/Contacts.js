import React, { useContext, Fragment } from 'react'
import contactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
    const { contacts, filtered } = useContext(contactContext)
    if (contacts.length === 0) {
        return <h4>Please Add a Contact</h4>
    }
    return (
        <Fragment>
            {filtered !== null ? filtered.map(filter => (
                <ContactItem contact={filter} key={filter.id} />
            ))
                : contacts.map(contact => (
                    <ContactItem contact={contact} key={contact.id} />
                ))}

        </Fragment>
    )
}

export default Contacts

