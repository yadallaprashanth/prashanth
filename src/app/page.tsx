import RecurringPicker from "../components/RecurringPicker";

export default function Home() {
  return (
    <main className="min-h-screen bg-white py-10">
      {/* Heading aligned fully left with no horizontal padding */}
      <h1 className="text-4xl font-bold text-blue-700 mb-10 ml-0">Recurring Date Picker</h1>

      {/* Picker wide and aligned left */}
      <RecurringPicker />
    </main>
  );
}
