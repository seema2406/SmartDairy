import { URLS } from '../constants/urlsConstant';
import { API } from '../config/apiConfig';
import { tagTypes } from '../constants/constants';

const partyApi = API.injectEndpoints({
  endpoints: builder => ({
    createParty: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.createParty,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.fetchParties, tagTypes.getDashboard],
    }),
    fetchParties: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchParties,
          method: 'POST',
          data,
        };
      },
      providesTags: [tagTypes.fetchParties],
    }),
    deleteParty: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.deleteParty,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.fetchParties, tagTypes.getDashboard],
    }),
    getDashboard: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.getDashboard,
          method: 'POST',
          data,
        };
      },
      providesTags: [tagTypes.getDashboard],
    }),
    getPartySearch: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.getPartySearch,
          method: 'POST',
          data,
          silent: true,
        };
      },
    }),
    getPartyDetail: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.getPartyDetail,
          method: 'POST',
          data,
        };
      },
    }),
    getItems: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.getItems,
          method: 'POST',
          data,
        };
      },
    }),
    getItemPrice: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.getItemPrice,
          method: 'POST',
          data,
        };
      },
    }),
    tranVocher: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.tranVocher,
          method: 'POST',
          data,
        };
      },
    }),
    fetchPartytoCustom: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchPartytoCustom,
          method: 'POST',
          data,
        };
      },
      providesTags: [tagTypes.fetchPartytoCustom],
    }),
    fetchSmartFilter: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.fetchSmartFilter,
          method: 'POST',
          data,
        };
      },
    }),
    getPartyType: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.getPartyType,
          method: 'POST',
          data,
        };
      },
    }),
  }),
});

export const {
  useCreatePartyMutation,
  useLazyFetchPartiesQuery,
  useDeletePartyMutation,
  useLazyGetDashboardQuery,
  useGetPartySearchMutation,
  useGetPartyDetailMutation,
  useGetItemsMutation,
  useGetItemPriceMutation,
  useTranVocherMutation,
  useLazyFetchPartytoCustomQuery,
  useFetchSmartFilterMutation,
  useGetPartyTypeMutation,
} = partyApi;

export default partyApi;
