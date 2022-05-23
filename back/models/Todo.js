const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name:{
        type:String
    },
    creator:{
        type:String
    },
    access:{
        type:String
    },
    checked:{
        type:Array
    },
    listItems:{
        type:Array
    }
})

module.exports = mongoose.model('todos',todoSchema)