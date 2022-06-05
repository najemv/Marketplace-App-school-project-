import {atom} from 'recoil';
import { OfferPreview, User } from '../types';
import { IFilter, LoginData } from '../types/user';

export const loginDataAtom = atom<LoginData>({
  key: 'loginData',
  default: {
    isLoggedIn: false,
    nickname: "",
    password: ""
  }
});

export const filterAtom = atom<IFilter>({
  key: 'filter',
  default: {
    priceFrom: 0,
    priceTo: Number.MAX_VALUE,
    place: "",
    sorting: "newest"
  }
});
