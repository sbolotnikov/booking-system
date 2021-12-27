const mongoose = require('mongoose');
Template: require('./template')
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({

      template_id:{
          type: Schema.Types.ObjectId,
          ref: "Template",
          required: true,
        },
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
const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
