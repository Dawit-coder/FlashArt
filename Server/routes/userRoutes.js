import express from 'express'
import {registerUser, loginUser, userCredits} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'
import paymentRoutes from '../routes/paymentRoutes.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/credits", userAuth, userCredits)
userRouter.use("/payment", userAuth, paymentRoutes);

export default userRouter