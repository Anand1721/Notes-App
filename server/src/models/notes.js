const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    text: {
        type: String,
        trim: true
    },
    date: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Notes = mongoose.model('Note', notesSchema)

module.exports = Notes