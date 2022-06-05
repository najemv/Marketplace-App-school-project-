export interface LoginData {
  isLoggedIn: boolean;
  nickname: string;
  password: string;
};

export interface IFilter {
  priceFrom: number;
  priceTo: number;
  place: string;
  sorting: string;
}