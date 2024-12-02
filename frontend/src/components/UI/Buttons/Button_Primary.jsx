import React from 'react'

function ButtonPrimary({ children, ...rest }) {
  return (
    <button
      className="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
      {...rest}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary
