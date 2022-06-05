import { ErrorMessage } from "@hookform/error-message";
import useSWR from "swr";
import serverAddress from "../../../serverAddress";
import { CategoryPreview } from "../../../types";
import fetcher from "../../../utils/fetcher";

interface CategoryChooserProps {
  order: number;
  register: Function;
}

export const CategoryChooser = ({order, register}: CategoryChooserProps) => {

  const {data, error} = useSWR(`${serverAddress}/category`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const categories: CategoryPreview[] = data.data;
  return (
    <select
      className="w-full my-1"
      {...register(`category${order}`)}
    >
      {categories.map((cat) => <option value={cat.id}>{cat.name}</option>)}
    </select>
  );
};

export default CategoryChooser;