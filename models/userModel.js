
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    default: 'guest' 
  },
  email: { 
    type: String,
    unique: true,
    required: true
  },
  password: { 
    type: String 
  },
  image: { 
    type: String, 
    default: '/icons/defaultUser.svg' 
  },
  status: { 
    type: String,
    default: 'user',
    required: true 
  },
  phone: { 
    type: String 
  },
  emailVerified: { 
    type: String, 
    default: null 
  },
}, { timestamps: true })

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset;