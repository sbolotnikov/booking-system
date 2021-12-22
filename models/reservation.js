const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
      location: {
        type: Number,
        required: true,
      },
      game: {
        type: Number,
        required: true,
      },
      reservationTime: {
        type: Date,
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
    }, {
        toJSON: {virtuals: true}
      }

);
ReservationSchema.virtual('timeStatus')
  .get( function () {
    if(this.reservationConfirmDate) return "red";
    if (this.requests.length>0) return "yellow";
    return "green";
  })
const Reservation = mongoose.models.Reservation ||mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
