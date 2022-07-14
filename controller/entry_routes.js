const { response } = require('express')
const express = require('express')
const router = express.Router()
const Entry = require('../models/practice')
const Practice = require('../models/practice')

////////////////////////////////
// POST - Create Entry
////////////////////////////////
router.post('/:practiceId', (req, res) => {
    const practiceId = req.params.practiceId;
    req.body.author = req.body.userId;
    Practice.findById(practiceId)
    .then(practice => {
        practice.entries.push(req.body);
        return practice.save()
    })
    .then(practice => {
        res.redirect(`/practices/${practice._id}`)
    })
    .catch(err => {
        res.json(err)
    })
})

////////////////////////////////
// DELETE - Delete Entry
////////////////////////////////
router.delete('/delete/:practiceId/:entryId', (req,res) => {
    const practiceId = req.params.practiceId;
    const entryId = req.params.entryId;
    Practice.findById(practiceId)
        .then(practice => {
            const entry = practice.entries.id(entryId)
            entry.remove()
            return practice.save()
        })
        .then(practice => {
            res.redirect(`/practices/${practiceId}`)
        })
        .catch(err => {
            res.send(err)
        })
})

// TODO: edit
////////////////////////////////
// GET - display an update form for entry
////////////////////////////////
router.get('/:practiceId/:entryId/edit', (req,res) => {
    // query
    const practiceId = req.params.practiceId;
    const entryId = req.params.entryId
    Practice.findById(practiceId)
        .then(practice => {
            const entry = practice.entries.id(entryId)
            console.log(practice)
            // this will show the edit form for the entry
            //console.log(entry)
            res.render('users/editEntry.liquid', { practice, entry })
            })
        .catch(err => {
            res.json(err)
        })
})

// TODO: edit
// ////////////////////////////////
// // PUT - Update the entry details
// ////////////////////////////////
router.put('/:practiceId/:entryId', (req, res) => {
    // find practice by ID, update it's subdoc with what's in req.body
    const practiceID = req.params.practiceId;
    const entryId = req.params.entryId
    Practice.findById(practiceID)
        .then(practice => {
            const entry = practice.entries.id(entryId)
            console.log(entry)
            Entry.findByIdAndUpdate(entryId, req.body, { new: true })
                .then(practice => {
                    res.redirect(`/practices/${practiceID}`)
                })
            })
        .catch(err => {
            res.json(err)
        })
    .catch(err => {
        res.json(err)
    })
})

////////////////////////////////
// Export router
////////////////////////////////
module.exports = router