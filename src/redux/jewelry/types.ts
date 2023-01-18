import { SortType } from "../filter/types";

export type FethDataType = {
    category:number, page:number, sort:SortType, searchValue:string
  }
  
  export type JewelryType={
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    raiting: number
    types: number[];
    sizes: number[];
  }
  
  export enum Status{
    LOADING='loading',
    SUCCES='succes',
    ERROR='error',
  }
  
  export interface JewelrySliceType{
    items: JewelryType[];
    status: Status
  }