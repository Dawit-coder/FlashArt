import mongoose from "mongoose"; // Removed unused 'mongo'

const transactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  stripePaymentId: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  date: { type: Date, default: Date.now } 
}, { timestamps: true }); 

const transactionModel = 
  mongoose.models.transaction || 
  mongoose.model('transaction', transactionSchema)

export default transactionModel