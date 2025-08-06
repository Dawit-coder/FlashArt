import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'

const StripePaymentModal = ({ plan, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, loadCreditsData, token } = useContext(AppContext);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/payment/create-payment-intent`,
        { userId: user._id, planId: plan.id }, {headers:{
          token: token,
        },}
      );

      const { error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (error) throw error;
      
      await loadCreditsData();
      onClose();
      toast.success('Payment successful!');

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center overflow-y-hidden">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h3 className="font-medium mb-4">Pay ${plan.price}</h3>
        <CardElement className="mb-4" />
        <div className="flex gap-2">
          <button 
            onClick={handlePayment}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Confirm Payment
          </button>
          <button 
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentModal;