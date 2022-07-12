const { response } = require('express')
const express = require('express')
// making a router
const router = express.Router()
// importing Practice model to access DB
const Entry = require('../models/practice')
const Practice = require('../models/practice')

// POST - Creation
// localhost:3000/practices/:practiceId <- a single practice can have many entries, remember!
// put and post do the same thing - so this is a duplicate URL!
// change to: localhost:3000/comments/:practiceId 
router.post('/:practiceId', (req, res) => {
    const practiceId = req.params.fruitId;
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


// DELETE - deletion
// localhost:3000/entries/delete/:practiceId/:entryId
router.delete('/delete/:practiceId/:entryId', (req,res) => {
    const practiceId = req.params.fruitId;
    const entryId = req.params.commId;
    // find a practice by its ID
    Practice.findById(practiceId) // single practice doc will have many comments
    // find this entry by its ID
        .then(practice => {
            const entry = practice.entries.id(entryId)
            entry.remove()
            return practice.save()
        })
        .then(practice => {
            res.redirect(`/practices/${practiceId}`)
        })
        .catch(err => console.log(err))

})




module.exports = router