export default function SuccessPage({ orderId }) {
  return (
    <div className="text-center mt-16">
      <h1 className="text-3xl font-bold text-green-600">
        Order Confirmed 🎉
      </h1>
      <p className="mt-2 text-gray-600">
        Your order ID is <strong>{orderId}</strong>
      </p>
    </div>
  );
}
