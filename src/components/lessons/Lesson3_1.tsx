export default function Lesson3_1() {
  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lesson 3.1: Booking a Load as a Guest</h1>
      <p>As a guest, you can preview loads without an account:</p>
      <ul className="list-disc ml-5 mt-3 text-gray-700 space-y-1">
        <li>Go to the <strong>Load Board</strong> section</li>
        <li>Apply filters like origin, equipment, or urgency</li>
        <li>Click a load to view basic details</li>
        <li>Click "Book Now" to create an account and confirm</li>
      </ul>
      <p className="mt-4 text-sm italic text-gray-500">Note: Guests have limited access to pricing, analytics, and automation.</p>
    </div>
  );
}