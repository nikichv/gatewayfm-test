import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosPromise } from 'axios';
import { ApiError } from 'global';

export const wrapRequestAsThunk =
  <ThunkParams = void, ExtraRejectValue = void>() =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  <RequestResponse, RequestParams>(
    name: string,
    req: (params: RequestParams) => AxiosPromise<RequestResponse>
  ) =>
    createAsyncThunk<
      RequestResponse,
      ThunkParams extends Record<string, unknown>
        ? RequestParams & ThunkParams
        : RequestParams,
      { rejectValue: ExtraRejectValue & ApiError }
    >(name, async (state, thunkAPI) => {
      const { signal, rejectWithValue } = thunkAPI;
      const source = axios.CancelToken.source();

      /**
       * Cancel the request if we cancel the thunk
       */
      signal.addEventListener('abort', () => {
        source.cancel();
      });

      const response = await req({
        ...state,
        cancelToken: source.token,
      });

      const { data, status } = response;

      if (status >= 400) {
        return rejectWithValue(data as unknown as ExtraRejectValue & ApiError);
      }

      return data;
    });

export default wrapRequestAsThunk;
