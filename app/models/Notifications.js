const time = require('./../libs/timeLib')

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let notificationSchema = new Schema({
  notificationId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  description: {
    type: String,
    default: 'no descrition Given'
  },
  issueId: {
    type: String,
    default: ''
  },
  createdOn:{
      type:Date,
      default:time.now()
  }

})

mongoose.model('Notification', notificationSchema);