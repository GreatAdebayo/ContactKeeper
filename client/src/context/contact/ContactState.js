//Global state and functions
import React, { useReducer } from 'react'
import ContactContext from '../contact/contactContext'
import contactReducers from '../contact/contactReducers'
import axios from 'axios'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from './contactActions'


const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered:null,
        error:null
    }
    const [state, dispatch] = useReducer(contactReducers, initialState)

    //Add to contact
    const addToContact = async contact => {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    try {
      const res = await axios.post('/api/contacts', contact, config)
      dispatch({
        type:ADD_CONTACT,
        payload: res.data
    })
    } catch (err) {
     dispatch({
         type: CONTACT_ERROR,
         payload:err.response.msg
     })
    }
            
    }

    //Delete Contact
    const deleteContact = async id =>{
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({
              type:DELETE_CONTACT,
              payload: id
          })
          } catch (err) {
           dispatch({
               type: CONTACT_ERROR,
               payload:err.response.msg
           })
          }
     
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
      const updateContact = async contact => {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({
        type:UPDATE_CONTACT,
        payload:res.data
    })
    } catch (err) {
     dispatch({
         type: CONTACT_ERROR,
         payload:err.response.msg
     })
    }
      
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


    //Add to contact
    const getContact = async contact => {
      
    try {
      const res = await axios.get('/api/contacts')
      dispatch({
        type:GET_CONTACTS,
        payload: res.data
    })
    } catch (err) {
     dispatch({
         type: CONTACT_ERROR,
         payload:err.response.msg
     })
    }
       
       
    }

    //Clear Contact
    const clearContact = () =>{
        dispatch({
            type:CLEAR_CONTACTS
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
            clearFilter,
            error:state.error,
            getContact,
            clearContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
