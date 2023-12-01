import { URLS } from '../constants/urlsConstant';
import { API } from '../config/apiConfig';
import { tagTypes } from '../constants/constants';

const reportApi = API.injectEndpoints({
  endpoints: builder => ({
    fetchDayBook: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchDayBook,
          method: 'POST',
          data,
        };
      },
    }),
    fetchVoucherBook: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchVoucherBook,
          method: 'POST',
          data,
        };
      },
    }),
    fetchCashBook: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.fetchCashBook,
          method: 'POST',
          data,
        };
      },
    }),
    fetchTranVoucher: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.fetchTranVoucher,
          method: 'POST',
          data,
        };
      },
    }),
    fetchPartyLedger: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.fetchPartyLedger,
          method: 'POST',
          data,
        };
      },
    }),
    downloadPDFFileName: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.downloadPDFFileName,
          method: 'POST',
          data,
        };
      },
    }),
  }),
});

export const {
  useLazyFetchDayBookQuery,
  useLazyFetchVoucherBookQuery,
  useFetchCashBookMutation,
  useFetchPartyLedgerMutation,
  useFetchTranVoucherMutation,
  useDownloadPDFFileNameMutation,
} = reportApi;

export default reportApi;
