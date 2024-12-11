const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');


const userSchema = new mongoose.Schema({
  fullName: {
      type: String,
      required: true
  },
  role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user"
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
    createdTime: { type: String,
       default: () => moment().format('D-M-Y HH:mm:ss') },
  recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'  // Refers to the Recipe model
  }],
  favoriteRecipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
  }]
});


userSchema.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
        return next();
    }
  
    try {
        user.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        return next(err);
    }
  });
  

const User = mongoose.model('users', userSchema);

module.exports = User;