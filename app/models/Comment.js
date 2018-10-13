const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let CommentSchema = new Schema({
  commentId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  issueId:{
      type:String,
      default:""
  },
  description: {
    type: String,
    default: 'no descrition Given'
  },
  by: {
    type: String,
    default: ''
  },
  byId: {
    type: String,
    default: ""
  },
  createdOn :{
    type:Date,
    default:""
  }

})

mongoose.model('Comment', CommentSchema);