export const Login = () => {
  return (
    <div className="grid place-items-center h-5/6">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Nickname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
            id="username" type="text" placeholder="Enter nickname"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
            id="password" type="password" placeholder="Enter password"/>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
            type="button">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
