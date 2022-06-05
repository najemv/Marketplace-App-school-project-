import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { filterAtom } from "../../../../state/atom";
import { IFilter } from "../../../../types/user";


export const Filter = () => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const [filter, setFilter] = useRecoilState(filterAtom);
  const onSubmit = async (data: any) => {
    console.log(data);
    const newFilter: IFilter = {
      priceFrom: Number(data.priceFrom) || 0,
      priceTo: Number(data.priceTo) || Number.MAX_VALUE,
      place: data.place,
      sorting: data.sorting,
    };
    console.log(newFilter);
    setFilter(newFilter);
  };

  const onReset = () => {
    setFilter({
      priceFrom: 0,
      priceTo: Number.MAX_VALUE,
      place: "",
      sorting: "newest"
    });
    reset();
    reset();
  }


  return (
    <div>
      <form className="flex flex-wrap m-4 justify-center" onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <div className="flex p-2">
      <label
        className="block text-gray-700 text-sm font-bold m-2"
        htmlFor="price-from">
        From:
      </label>
      <input
        className="shadow appearance-none border rounded w-20 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
        id="price-from"
        type="number"
        min={0}
        {...register("priceFrom")}
      />

      <label
        className="block text-gray-700 text-sm font-bold m-2"
        htmlFor="price-to">
        To:
      </label>
      <input
        className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
        id="price-to"
        type="number"
        min={0}
        {...register("priceTo")}
      />
        </div>
        <div className="flex p-2">
      <label
        className="block text-gray-700 text-sm font-bold m-2"
        htmlFor="place">
        Place:
      </label>
      <input
        className="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
        id="place"
        type="text"
        placeholder="Place..."
        {...register("place")}
      />
        </div>
        <div className="flex p-2">
      <label
        className="block text-gray-700 text-sm font-bold m-2"
        htmlFor="sorting">
        Sort by:
      </label>
      <select
        defaultValue={"newest"}
        {...register("sorting")}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="lastEdited">Last edited</option>
        <option value="lowestPrice">Lowest price</option>
        <option value="highestPrice">Highest price</option>
      </select>
        </div>
        <div className="flex p-2">
      <button
        className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 mx-2 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
        type="submit">
        Apply
      </button>
      <button
        className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 mx-2 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
        type="reset">
        Reset
      </button>
        </div>
      </form>

    </div>
  );
};

export default Filter;
