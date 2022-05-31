import { Link } from "react-router-dom";

interface InfoProps {
  message: string;
}

export const Info = ({message}: InfoProps) => {

  return (
    <div className="grid place-items-center h-5/6 bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 h-screen">
      <div className="grid place-items-center">
        <div className="text-2xl">{message}</div>
        <Link to="/">
          <button className="m-10 bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline">
            Go Home
          </button>
        </Link>
      </div>
      
    </div>
  )
};

export default Info;