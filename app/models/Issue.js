const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let issueSchema = new Schema({
  issueId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  status: {
    type: String,
    default: 'Backlog'
  },
  title: {
    type: String,
    default: 'none'
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
  assignedToName:{
    type:String,
    default:""
  },
  assignedToId:{
    type:String,
    default:""
  },
  createdOn :{
    type:Date,
    default:""
  }

})

issueSchema.index({'$**':'text'})

mongoose.model('Issue', issueSchema);