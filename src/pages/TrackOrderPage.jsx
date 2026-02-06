import { useParams } from "react-router-dom";
import OrderStatus from "../components/OrderStatus";
import Layout from "../components/Layout";
import Checkout from "../components/CheckOut";
import OrderTracking from "../components/TrackOrder";

export default function TrackOrderPage() {
  const { orderId } = useParams();

  return (
    
    <Layout>
          <OrderTracking/>
        </Layout>
  );
}
