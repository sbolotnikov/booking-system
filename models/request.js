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
      telefone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      }, 
      participants: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number
      },
      Total: {
        type: Number
      },
  });

RequestSchema.set('timestamps', true);   
const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;