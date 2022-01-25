const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({

  appointments:[
    {
        reservationHour: {
          type: Number,
          required: true,
        },
        reservationMin: {
            type: Number,
            required: true,
          },
        price: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        perPerson: {
          type: Boolean,
          required: true,
        },
      }],

    color: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      game: {
        type: Number,
        required: true,
      }, 
      location: {
        type: Number,
      },
      title: {
        type: String
      },
  });

ScheduleSchema.set('timestamps', true);   
const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);
module.exports = Schedule;
