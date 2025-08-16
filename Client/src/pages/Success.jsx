import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Success = () => {
  const { loadCreditsData } = useContext(AppContext);

  useEffect(() => {
    loadCreditsData();           
    toast.success("Payment successful! Credits updated.");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-green-600">Thank you!</h2>
      <p>Your payment was successful and your credits have been updated.</p>
    </div>
  );
};

export default Success;
