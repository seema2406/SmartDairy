import { URLS } from '../constants/urlsConstant';
import { API } from '../config/apiConfig';
import { tagTypes } from '../constants/constants';

const dairyApi = API.injectEndpoints({
  endpoints: builder => ({
    addDairy: builder.mutation<any, any>({
      query: data => {
        return {
          url: URLS.addDairy,
          method: 'POST',
          data,
        };
      },
      // invalidatesTags: [tagTypes.checkDevice],
    }),
  }),
});

export const { useAddDairyMutation } = dairyApi;

export default dairyApi;
