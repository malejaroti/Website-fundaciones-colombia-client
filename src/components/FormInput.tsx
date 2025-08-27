function FormInput({ label, ...props }) {
  return (
    <div className="space-y-1 mt-2 flex flex-row items-center justify-end gap-5 mr-6">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="textbox w-[60%] mt-1 block rounded-md border-gray-300 shadow-sm 
                   focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

export default FormInput