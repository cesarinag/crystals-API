const express = require('express')
const passport = require('passport')

// instantiate a router (mini app that only handles routes)
const router = express.Router()
// pull in Mongoose model for examples
const Crystal = require('../models/crystal')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// // this is middleware that will remove blank fields from `req.body`, e.g.
// // { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })


// INDEX
// GET /crystals
router.get('/crystals', requireToken, (req, res, next) => {
  Crystal.find()
  .then(crystal => res.status(200).json({ crystal: crystal }))
  .catch(next)
})

// CREATE
// POST /crystals
router.post('/crystals', requireToken, (req, res, next) => {
  const crystalData = req.body.crystal
  crystalData.owner = req.user._id
  Crystal.create(crystalData)
  .then(crystal => res.status(201).json({ crystal: crystal }))
  .catch(next)
})


// SHOW
// GET ONE Crystal
router.get('/crystals/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const crystalData = req.body.crystal

  Crystal.findById(id)
  .then(handle404)
  // .populate('owner')
  .then(() => {
    return crystalData
  })
  .then(crystal => {
    res.status(200).json({ crystal:crystal
     })
})
  .catch(next)
})


// UPDATE
// PATCH one crystal
router.patch('/crystals/:id', requireToken, (req, res, next) => {
  delete req.body.crystal.owner
  const id = req.params.id
  const crystalData = req.body.crystal

  Crystal.findById(id)
  .then(handle404)
  .then(crystal => {
    requireOwnership(req, crystal)
    return crystal.updateOne(crystalData)
  })
  .then(() => res.sendStatus(202))
  .catch(next)
})


// DELETE
router.delete('/crystals/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Crystal.findById(id)
    .then(handle404)
    .then(crystal => {
      // throw an error if current user doesn't own `crystal`
      requireOwnership(req, crystal)
      // delete the crystal ONLY IF the above didn't throw
      crystal.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})



module.exports = router
