const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({

      reservation:{
          type: Schema.Types.ObjectId,
          ref: 'Reservation',
          required: true,
        },
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
        required: true,
      }, 
      participants: {
        type: Number,
      },
      message: {
        type: String
      },
  });

RequestSchema.set('timestamps', true);   
const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;