export default function OrderStatus({ status }) {
  const steps = [
    "Order Received",
    "Preparing",
    "Out for Delivery",
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Order Status</h2>

      {steps.map(step => (
        <div
          key={step}
          className={`p-3 mb-2 rounded-lg ${
            step === status
              ? "bg-indigo-100 text-indigo-700"
              : "bg-gray-100"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
