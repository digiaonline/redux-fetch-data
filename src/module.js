import { handleActions, createAction } from 'redux-actions';

const DONE_FETCHING = 'fetch-data/DONE_FETCHING';

export function handleDoneFetching(state) {
  return { ...state, fetched: true };
}

const reducer = handleActions({
  [DONE_FETCHING]: handleDoneFetching
}, { fetched: false });

export const doneFetching = createAction(DONE_FETCHING);

export default reducer;
