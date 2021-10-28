const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact')
const User = require('../models/User')
const middleware = require('../middleware/auth');
const { body, validationResult, check } = require('express-validator');


// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private

router.get('/', middleware, async (req, res) => {
    try {
        const contact = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private

router.post('/', [middleware,
    [
        check('name', 'Name is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private

router.put('/:id', middleware, async (req, res) => {
    const { name, email, phone, type } = req.body;

    //Build Contact Object
    const contactFileds = {};
    if (name) contactFileds.name = name;
    if (email) contactFileds.email = email;
    if (phone) contactFileds.phone = phone;
    if (type) contactFileds.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'not found' });

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ mgs: 'Unauthorize' });
        }

        //Update contact
        contact = await Contact.findByIdAndUpdate(req.params.id, {
            $set: contactFileds
        },
            { new: true })
        res.json(contact)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/contacts/:id
// @desc    Update contact
// @access  Private

router.delete('/:id', middleware, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'not found' });

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ mgs: 'Unauthorize' });
        }

        //Delete contact
        await Contact.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Contact Removed' })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
