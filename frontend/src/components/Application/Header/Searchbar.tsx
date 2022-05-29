import { useForm } from "react-hook-form";



export const Searchbar = () => {

  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = () => {
    // TODO
  };

  return(
    <div>
      <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search..."
          className="rounded-lg"
          {...register("search", {required: true})}
        />
        <input
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
};

export default Searchbar;