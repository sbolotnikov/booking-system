const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  game: {
    type: Number,
  },
  location: {
    type: Number,
  },
  date: {
    type: Date,
  },
  reservationHour: {
    type: Number,
  },
  reservationMin: {
    type: Number,
  },
  schedule_id: { type: String },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  participants: {
    type: Number,
  },
  message: {
    type: String,
  },
  adminID:  {
    type: String,
  },
  specialNote:[
    {
      note: {
        type: String,
        required: true,
      },
      adminID: {
        type: String,
        required: true,
      },
      dateChange: {
        type: Date,
      }
    }],
  reservationConfirmDate: {
    type: Date
  },
  changesToRequest:[
    {
      note: {
        type: String,
        required: true,
      },
      adminID: {
        type: String,
        required: true,
      },
      dateChange: {
        type: Date,
      }
    }]
});

RequestSchema.set('timestamps', true);
const Request = mongoose.models.Request ||mongoose.model('Request', RequestSchema);
module.exports = Request;
