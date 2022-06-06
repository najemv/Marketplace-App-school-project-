import {useParams} from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useSWR from "swr";
import { filterAtom } from "../../../state/atom";
import {OfferPreview} from "../../../types";
import fetcher from "../../../utils/fetcher";
import { OrderFilter } from "../../../utils/filter";
import Filter from "./Filter/Filter";
import OfferCard from "./OfferCard";


export const ListOfOffers = () => {
  let {id, content} = useParams();
  console.log(content);
  const cat_id = parseInt(id!);
  let name: string;
  const filter = useRecoilValue(filterAtom);
  let offers: OfferPreview[];

  // Get all offers or offer in single category
  
  if (!cat_id) {
    const {data, error} = useSWR(`http://localhost:4000/offer`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    if (content != undefined) {
      offers = OrderFilter(data.data, filter, content);
      name = `Search result for: "${content}"`;
    } else {
      offers = OrderFilter(data.data, filter);
      name = "All offers";
    }
    
  } else {
    const {data, error} = useSWR(`http://localhost:4000/category/${cat_id}`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    offers = OrderFilter(data.data.offers, filter);
    name = data.data.name;
  }

 
  return (
    <main className="mx-1 lf:mx-10 w-full">
      <Filter />
      <h1 className="font-bold font-sans text-2xl mt-10">{name.toUpperCase()}</h1>
      <ul role="list" className="divide-y divide-solid flex flex-wrap">
        {offers.map((offer) => <OfferCard key={offer.id} {...offer}/>)}
      </ul>
    </main>
  );
};

export default ListOfOffers;
