import { OfferPreview } from "../types";
import { IFilter } from "../types/user";

export const OrderFilter = (offers: OfferPreview[], filter: IFilter, content: string = "") => {
  let sortedOffers: OfferPreview[];
  switch(filter.sorting) {
    case "lastEdited":
      sortedOffers = offers.sort((a, b) => (a.updatedAt < b.updatedAt) ? -1 : 1);
      break;
    case "oldest":
      console.log("oldest sorting");
      sortedOffers = offers.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1);
      break;
    case "newest":
      sortedOffers = offers.sort((a, b) => (a.createdAt < b.createdAt) ? -1 : 1);
      break;
    case "lowestPrice":
      sortedOffers = offers.sort((a, b) => a.price - b.price);
      break;
    case "highestPrice":
      sortedOffers = offers.sort((a, b) => b.price - a.price);
      break;
    default:
      sortedOffers = offers;
  };

  return sortedOffers.filter((offer) => {
    return offer.price >= filter.priceFrom && offer.price <= filter.priceTo &&
      offer.place.toLowerCase().includes(filter.place.toLowerCase()) &&
      (offer.title.toLowerCase().includes(content.toLowerCase()) ||
      offer.description.toLowerCase().includes(content.toLowerCase()));
  });
};


