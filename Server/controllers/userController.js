import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import transactionModel from "../models/transactionModel.js";
import stripePackage from "stripe";


const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success:false, message: "Missing Details"})            
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name, 
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user: {name: user.name}})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: 'User does not exist'})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token, user:{name: user.name}})
        }else{
            return res.json({success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const userCredits = async (req, res) =>{
    try {
        const userId = req.userId

        const user = await userModel.findById(userId)
        res.json({success: true, credits: user.creditBalance, user: {name: user.name}})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}

const stripe = stripePackage(process.env.SECRET_KEY)

const paymentStripe = async(req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.userId
        const userData = await userModel.findById(userId)

        if(!userId || !planId){
            return res.json({success: false, message: "Missing Details"})
        }
        const plans = {
            Basic: { credits: 100, amount: 1000 }, 
            Advanced: { credits: 500, amount: 5000 },
            Business: { credits: 5000, amount: 25000 }
        };
      
        const selectedPlan = plans[planId];
        if (!selectedPlan) {
            return res.json({success: false, message: 'Invalid plan'});
        }
      
        const paymentIntent = await stripe.paymentIntents.create({
            amount: selectedPlan.amount,
            currency: "usd",
            metadata: { userId, credits: selectedPlan.credits }
        });
     
    
        await transactionModel.create({
            userId,
            plan: planId,
            amount: selectedPlan.amount / 100, 
            credits: selectedPlan.credits,
            stripePaymentId: paymentIntent.id,
            date: Date.now(),
            payment: true
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret
          });
      
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
    }
        
export {registerUser, loginUser, userCredits, paymentStripe}


