import {atom} from 'recoil';
import { User } from '../types';

export let loginState = {
  isLoggedIn: false,
  nickname: "",
  password: ""
}
