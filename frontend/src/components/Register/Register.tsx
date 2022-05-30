export const Register = () => {
  return (
    <div className="grid place-items-center h-5/6">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="grid-first-name" type="text" placeholder="Enter email"/>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname">
              Nickname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="nickname" type="text" placeholder="Enter nickname"/>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-4/6 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="password" type="password" placeholder="Enter password"/>
          </div>
          <div className="flex flex-wrap mt-7 ml-0 md:ml-12">
            <div className="w-full md:w-1/2 px-3">
              <button
                className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
                type="button">
                Register
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Register;
