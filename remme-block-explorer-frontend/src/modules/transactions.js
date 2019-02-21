import { map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import api from "../config/api";

const TRANSACTION_FETCH = "TRANSACTION::FETCH";
const TRANSACTION_FETCH_FULFILLED = "TRANSACTION::FETCH_FULFILLED";

export const transactionsFetch = ({ start = null, limit = null, hash = null } = { start: null, limit: null, hash: null }) => ({
  type: TRANSACTION_FETCH,
  payload: { start, limit, hash }
});

const transactionsFulfilled = payload => ({ type: TRANSACTION_FETCH_FULFILLED, payload });

const transactionsFetchEpic = (action$) => action$.pipe(
  ofType(TRANSACTION_FETCH),
  mergeMap(
    action => {
      if (action.payload.start) {
        action.payload.start = "0x" + ("0000000000000000" + action.payload.start).slice(-16);
      }
      if (action.payload.hash) {
        return api.getTransactionsByIdPipe(action.payload.hash).pipe(
          map(data => transactionsFulfilled([data.response.data]))
        )
      }
      return api.getTransactionsPipe({ params: action.payload }).pipe(
        map(data => transactionsFulfilled(data.response.data))
      )
    }
  )
);

export const transactionsEpic = combineEpics(
  transactionsFetchEpic,
);

const handleFetch = (state, payload) => {
  return payload;
};

const handlers = {
  [TRANSACTION_FETCH_FULFILLED]: handleFetch,
};

export default (state = [], action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
