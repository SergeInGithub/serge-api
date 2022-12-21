'use strict';

   // Import mongoose
   const  mongoose = require("mongoose");

   // Import bcryptjs - for password hashing
   const  bcrypt = require('bcryptjs');

   // Declare schema and assign Schema class
   const  Schema = mongoose.Schema;

   // Create Schema Instance for User and add properties
   const  UserSchema = new  Schema({
   fullName: {
   type:  String,
   trim:  true,
   required:  true
   },

   email: {
   type:String,
   unique:true,
   lovercase:true,
   trim:true,
   required:true
   } ,

   password: {
   type:String,
   required:true
   },

   createdOn: {
   type:  Date,
   default:  Date.now
 },
 isAdmin: {
   type: Boolean,
   default: false,
 }
   });

   UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  }
})

UserSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is missing; nothing to compare')
  try {
    const result = await bcrypt.compare(password, this.password)
    return result
  } catch (error) {
    console.log('Error while comparing the password: ', error.message)
  }
}
UserSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Invalid Email')
  try {
    const user = await this.findOne({ email })
    if (user) return false
    return true
  } catch (error) {
    console.log('error inside isThisEmailInUse method: ', error.message)
    return false
  }
}

   //Create a Schema method to compare password
   // UserSchema.methods.comparePassword = function(password){
   // return  bcrypt.compareSync(password, this.password);
   // }

   // Create and export User model
   module.exports = mongoose.model("User", UserSchema);
