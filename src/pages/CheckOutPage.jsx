import Cart from "../components/Cart";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Checkout from "../components/CheckOut";

export default function CartPage() {
  const navigate = useNavigate();

  const handleOrderPlaced = (orderId) => {
    navigate(`/success/${orderId}`);
  };

  return (
    <Layout>
      <Checkout/>
    </Layout>
  );
}
