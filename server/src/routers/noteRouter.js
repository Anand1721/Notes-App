const express = require('express')
const Note = require('../models/notes')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/notes/create', auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id
    })
    try {
        await note.save()
        res.status(201).send(note)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/notes/get', auth, async (req, res) => {
    try {
        await req.user.populate({path: 'notes'}).execPopulate()
        res.send(req.user.notes)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/notes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'text', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    const _id = req.params.id
    try {
        const note = await Note.findOne({ _id, owner: req.user._id })
        if (!note) {
            return res.status(404).send()
        }
        updates.forEach((update) => note[update] = req.body[update])
        await note.save()
        res.send(note)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/notes/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const note = await Note.findOneAndDelete({ _id })
        if (!note) {
            return res.status(404).send()
        }
        res.send(note)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router