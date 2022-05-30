import { useForm } from "react-hook-form";



export const Searchbar = () => {

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    // TODO
  };

  return(
    <div className="flex justify-center mr-2">
      <div className="xl:w-96">
        <form action="" className="relative flex items-stretch w-full" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="mr-2 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-mint-cream bg-clip-padding border border-solid border-imperial-red rounded transition ease-in-out m-0 focus:text-gray-700 border-space-cadet focus:border-medium-candy-apple-red focus:ring-0"
                placeholder="What are you looking for?"
                aria-label="Search"
                />
                <input
                  className="btn inline-block px-6 py-2 border-2 border-imperial-red text-imperial-red font-medium text-xs leading-tight uppercase rounded hover:bg-medium-candy-apple-red focus:text-mint-cream hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  type="submit"
                  value="Search"
                  id="button-addon3"
                />
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
