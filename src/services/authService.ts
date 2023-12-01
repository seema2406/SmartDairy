import { URLS } from '../constants/urlsConstant';
import { API } from '../config/apiConfig';
import { tagTypes } from '../constants/constants';

const authApi = API.injectEndpoints({
  endpoints: builder => ({
    checkDevice: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.checkDevice,
          method: 'POST',
          data,
          silent: true,
        };
      },
      // providesTags: [tagTypes.checkDevice],
    }),
    registerUser: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.registerUser,
          method: 'POST',
          data,
        };
      },
    }),
    verifyOtp: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.verifyOtp,
          method: 'POST',
          data,
        };
      },
    }),
    fetchStateCity: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchStateCity,
          method: 'POST',
          data,
        };
      },
    }),
    fetchCoUser: builder.query<any, any>({
      query: data => {
        return {
          url: URLS.fetchCoUser,
          method: 'POST',
          data,
        };
      },
      providesTags: [tagTypes.fetchCoUser],
    }),
    addCoUser: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.addCoUser,
          method: 'POST',
          data,
        };
      },
      invalidatesTags: [tagTypes.fetchCoUser],
    }),
  }),
});

export const {
  useLazyCheckDeviceQuery,
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useFetchStateCityQuery,
  useLazyFetchStateCityQuery,
  useLazyFetchCoUserQuery,
  useAddCoUserMutation,
} = authApi;

export default authApi;
