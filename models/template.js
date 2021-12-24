const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempllateSchema = new Schema({

      appointments:[
        {
            location: {
              type: Number,
            },
            game: {
              type: Number,
            },
            reservationTime: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            requests: [
              {
                type: Schema.Types.ObjectId,
                ref: 'Request',
              },
            ],
            finalReservation: {
              type: Schema.Types.ObjectId,
              ref: 'Request',
            },
            reservationConfirmDate: {
              type: Date
            },
          }],

      name: {
        type: String
      },
    }, 
);

const Template = mongoose.models.Template ||mongoose.model('Template', TemplateSchema);

module.exports = Template;
