const mongoose = require('mongoose')

const crystalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  chakra: {
    type: String,
    required: true
  },
  indigenousTo: {
    type: String,
    required: true
  },
  ritualUse: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
}, {
    timestamps: true
  })

module.exports = mongoose.model('Crystal', crystalSchema)
