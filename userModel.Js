const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,    
    unique: true,      
    trim: true,        
    minlength: [3, 'Username must be at least 3 characters long'], 
    maxlength: [30, 'Username cannot exceed 30 characters']  
  },
  
  password: {
    type: String,
    required: true,    
    minlength: [6, 'Password must be at least 6 characters long'],  
  },

  email: {
    type: String,
    required: true,    
    unique: true,      
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },

  createdAt: {
    type: Date,
    default: Date.now, 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;