import moment from 'moment';
import { map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import api from "../config/api";

const BLOCK_FETCH = "BLOCK::FETCH";
const BLOCK_FETCH_FULFILLED = "BLOCK::FETCH_FULFILLED";
const BLOCK_FETCH_INFO = "BLOCK::FETCH_INFO";

export const blocksFetch = ({ start = null, limit = null, hash = null } = { start: null, limit: null, hash: null }) => ({
  type: BLOCK_FETCH,
  payload: { start, limit, hash }
});

const blocksFulfilled = payload => ({ type: BLOCK_FETCH_FULFILLED, payload });
const blocksInfo = payload => ({ type: BLOCK_FETCH_INFO, payload });

const blocksFetchEpic = (action$) => action$.pipe(
  ofType(BLOCK_FETCH),
  mergeMap(
    action => {
      if (action.payload.start) {
        action.payload.start = "0x" + ("0000000000000000" + action.payload.start).slice(-16);
      }
      if (action.payload.hash) {
        return api.getBlocksByIdPipe(action.payload.hash).pipe(
          map(data => blocksFulfilled([data.response.data]))
        )
      }
      return api.getBlocksPipe({ params: action.payload }).pipe(
        map(data => blocksFulfilled(data.response.data))
      )
    }
  )
);

const blocksFetchInfoEpic = action$ => action$.pipe(
  ofType(BLOCK_FETCH_FULFILLED),
  mergeMap(
    action => {
      const params = {
        start: parseInt(action.payload[0].header.block_num),
        limit: action.payload.length - 1
      };

      return api.getBlockInfoPipe({ params }).pipe(
        map(data => blocksInfo(data.response))
      )
    }
  )
);

export const blocksEpic = combineEpics(
  blocksFetchEpic,
  blocksFetchInfoEpic,
);

const handleFetch = (state, payload) => {
  return payload;
};

const handleInfo = (state, payload) => {
  return [
    ...state.map(item => {
      const index = payload.findIndex(elem => {
        return elem.blockNum.toString() === item.header.block_num
      });
      if (index !== -1) {
        item.header.timestamp = moment.unix(payload[index].timestamp).format("HH:mm:ss DD/MM/YYYY");
      }
      return item;
    }),
  ];
};

const handlers = {
  [BLOCK_FETCH_FULFILLED]: handleFetch,
  [BLOCK_FETCH_INFO]: handleInfo,
};

export default (state = [], action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};