import Cart from "../components/Cart";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function CartPage() {
  const navigate = useNavigate();

  const handleOrderPlaced = (orderId) => {
    navigate(`/success/${orderId}`);
  };

  return (
    <Layout>
      <Cart/>
    </Layout>
  );
}
