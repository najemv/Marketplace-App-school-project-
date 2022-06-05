import useSWR from "swr";
import serverAddress from "../../../../serverAddress";
import {CategoryPreview} from "../../../../types";
import fetcher from "../../../../utils/fetcher";
import CategoryCard from "./CategoryCard";

export const Navigation = () => {

  const {data, error} = useSWR(`${serverAddress}/category`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const categories: CategoryPreview[] = data.data;

  return (
    <div>
      <nav className="sticky top-28 z-40 mb-5 lg:m-10 bg-space-cadet p-5 text-center lg:rounded-2xl text-2xl">
        <h1 className="text-mint-cream font-bold">Categories</h1>
        <ul role="list">
          <CategoryCard name="All" id={0}/>
          {categories.map((cat) => <CategoryCard key={cat.id} {...cat}/>)}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
