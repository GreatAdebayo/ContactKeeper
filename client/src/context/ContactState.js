//Global state and functions
import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import contactReducers from './contactReducers'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    SET_ALERT,
    SET_CURRENT,
    UPDATE_CONTACT,
    REMOVE_ALERT,
    FILTER_CONTACTS
} from './contactActions'


const ContactState = (props) => {
    const initialState = {
        contacts: [{
            id:"1",
            name: "adebayo great",
            email: "great@gmail.com",
            phone: "09077167366",
            type: "professional",
        },
        { 
            id:"2",
            name: "akano christy",
            email: "chris@gmail.com",
            phone: "080457635353",
            type: "personal",
        }],
        current: null,
        filtered:null
    }
    const [state, dispatch] = useReducer(contactReducers, initialState)

    //Add to contact
    const addToContact = contact => {
       contact.id = Math.random()
       dispatch({
           type:ADD_CONTACT,
           payload:contact
       })
    }

    //Delete Contact
    const deleteContact = id =>{
      dispatch({
          type:DELETE_CONTACT,
          payload:id
      })
    }

     //Set Current
     const setCurrent = contact =>{
        dispatch({
            type:SET_CURRENT,
            payload:contact
        })
      }

         //Clear Current
     const clearCurrent = () =>{
        dispatch({
            type:CLEAR_CURRENT
        })
      }

      //Update Contact
      const updateContact = contact => {
        dispatch({
            type:UPDATE_CONTACT,
            payload:contact
        })
      }

      //Filter Contact
      const filterContact = text =>{
          dispatch({
            type:FILTER_CONTACTS,
            payload:text
          })
      }

      //Clear Filter
      const clearFilter = () =>{
        dispatch({
            type:CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current:state.current,
            filtered:state.filtered,
            addToContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter 
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
