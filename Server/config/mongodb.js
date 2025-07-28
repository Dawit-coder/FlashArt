import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', ()=>{
        console.log("database Connected")
    })

    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log("connection error: ", error)
    }
    
}

export default connectDB;