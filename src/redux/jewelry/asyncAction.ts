import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FethDataType, JewelrySliceType, JewelryType } from "./types";

export const fetchJewelry = createAsyncThunk<JewelryType[],FethDataType>(
    'jewelry/fetchJeweleryStatus',
    async (params) => {
      const { category, page, sort, searchValue } = params
      const {type} = sort
      const res = await axios.get<JewelryType[]>(
        `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?page=${page}&limit=8&sortBy=${
          type
        }&order='asc'${searchValue ? `?&search=${searchValue}` : ''}&${
          category > 0 ? `category=${category}` : ''
        }`,
      );
      return res.data;
    },
  );