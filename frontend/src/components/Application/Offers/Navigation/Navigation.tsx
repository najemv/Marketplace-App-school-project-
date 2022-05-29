import useSWR from "swr";
import { Category, CategoryPreview } from "../../../../types";
import fetcher from "../../../../utils/fetcher";
import CategoryCard from "./CategoryCard";

export const Navigation = () => {

  const { data, error } = useSWR(`http://localhost:4000/category`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const categories: CategoryPreview[] = data.data;

  return (
    <nav className="m-10 bg-gray-300 p-5 text-center rounded-2xl text-2xl">
      <h1 className="">Kategorie</h1>
      <ul>
        <CategoryCard name="All" id={0} />
        {categories.map((cat) => <CategoryCard key={cat.id} {...cat}/>)}
      </ul>
    </nav>
  );
};

export default Navigation;
