'use strict';
// Import mongoose
    const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const PostSchema = new Schema({
        title: {
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        createdOn: {
            type:Date,
            default:Date.now
        }
    });

// create and export model
module.exports = mongoose.model("Post", PostSchema);
