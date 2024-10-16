export interface IProduct {
  createdAt: string;
  name: string;
  image: string;
  count: number;
  price: string;
  description: string;
  model: string;
  brand: string;
  id: string;
}

export interface IFilterItem {
  id: number;
  name: string;
  count: number;
}
