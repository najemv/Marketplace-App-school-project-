import {atom} from 'recoil';
import { User } from '../types';
import { LoginData } from '../types/user';

export const loginDataAtom = atom<LoginData>({
  key: 'loginData',
  default: {
    isLoggedIn: false,
    nickname: "",
    password: ""
  }
});
