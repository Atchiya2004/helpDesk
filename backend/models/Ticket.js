const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

description:{
type:String,
required:true
},

priority:{
type:String,
enum:["Low","Medium","High"],
default:"Low"
},

status:{
type:String,
enum:["Pending","InProgress","Resolved"],
default:"Pending"
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{timestamps:true});

module.exports = mongoose.model("Ticket",ticketSchema);