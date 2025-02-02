export function ProductInput({
  identifier,
  name,
  type,
  placeholder,
}: {
  identifier: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={identifier}
        className="absolute top-[-14px] left-3 px-1 bg-gray-50  text-lg"
      >
        {name}
      </label>
      {type == "textarea" ? (
        <textarea
          name={identifier}
          id={identifier}
          className="w-3xl h-28 text-2xl text-gray-900 placeholder-gray-400 bg-gray-50 border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 rounded-md p-1.5"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          name={identifier}
          id={identifier}
          className="w-3xl h-16 text-2xl text-gray-900 bg-gray-50 border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 rounded-md p-1.5"
          placeholder={placeholder}
          min={0}
        />
      )}
    </div>
  );
}
