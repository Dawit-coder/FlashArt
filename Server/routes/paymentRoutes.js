import express from 'express';
import { paymentStripe } from '../controllers/userController.js'
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

router.post('/create-payment-intent', paymentStripe);

router.post(
    '/webhook',
    express.raw({type: 'application/json'}),
    handleStripeWebhook
)

export default router;