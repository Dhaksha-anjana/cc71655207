export default function FormInput({ label, type, name, placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1 text-gray-800">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-3 placeholder-gray-500 text-black bg-white"
      />
    </div>
  );
}
