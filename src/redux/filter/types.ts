export enum SortPropertyEnum {
    RATING = 'rating',
    TITLE = 'title',
    PRICE = 'price',
  }
  
  export type SortType={
    name:string;
    type:SortPropertyEnum
  }
  
  export interface FilterSliceType{
    searchValue: string,
    category: number,
    page: number,
    sort: SortType,
  }