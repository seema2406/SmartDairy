import { URLS } from '../constants/urlsConstant';
import { API } from '../config/apiConfig';
import { tagTypes } from '../constants/constants';

const itemApi = API.injectEndpoints({
  endpoints: builder => ({
    createItem: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.createItem,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.fetchItems],
    }),
    fetchItems: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchItems,
          method: 'POST',
          data,
        };
      },
      providesTags: [tagTypes.fetchItems],
    }),
    deleteItem: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.deleteItem,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.fetchItems],
    }),
    addCustomPrice: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.addCustomPrice,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [
        tagTypes.fecthItemstoCustom,
        tagTypes.fetchPartytoCustom,
        tagTypes.fetchCustomPrice,
      ],
    }),
    fetchCustomPrice: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchCustomPrice,
          method: 'POST',
          data,
        };
      },
      providesTags: [tagTypes.fetchCustomPrice],
    }),
    fecthItemstoCustom: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fecthItemstoCustom,
          method: 'POST',
          data,
        };
      },
      providesTags: [tagTypes.fecthItemstoCustom],
    }),
  }),
});

export const {
  useCreateItemMutation,
  useLazyFetchItemsQuery,
  useDeleteItemMutation,
  useAddCustomPriceMutation,
  useLazyFetchCustomPriceQuery,
  useLazyFecthItemstoCustomQuery,
} = itemApi;

export default itemApi;
