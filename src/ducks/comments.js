import { createSelector } from 'reselect'
import { REQUEST, SUCCESS, ERROR } from '../middlewares/fetch'
import { dataToEntities } from '../utils'
import { appName, API_URL } from '../config'
import createSagaMiddleware, { takeEvery } from 'redux-saga'
import {put, call} from 'redux-saga/effects';

const initialState = {
  data: {},
  opened: [],
  loading: false,
  formLoading: false
}

const namespace = 'comments';
const prefix = `${appName}/${namespace}`

const LOAD_ALL_COMMENTS = `${prefix}/LOAD_ALL_COMMENTS`
const TOGGLE_COMMENTS = `${prefix}/TOGGLE_COMMENTS`
const SUBMIT_NEW_COMMENT = `${prefix}/SUBMIT_NEW_COMMENT`

/*  reducer  */

function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case LOAD_ALL_COMMENTS + REQUEST:
      return {
        ...state,
        loading: true
      }

    case LOAD_ALL_COMMENTS + SUCCESS:
      return {
        ...state,
        data: dataToEntities(payload.records),
        loading: false
      }

    case LOAD_ALL_COMMENTS + ERROR:
      return {
        ...state,
        loading: false
      }

    case TOGGLE_COMMENTS:
      return {
        ...state,
        opened: state.opened.includes(payload.id)
          ? state.opened.filter(id => id !== payload.id)
          : state.opened.concat(payload.id)
      }

    case SUBMIT_NEW_COMMENT + REQUEST:
      return {
        ...state,
        formLoading: true
      }

    case SUBMIT_NEW_COMMENT + SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.id]: payload
        },
        formLoading: false
      }

      case SUBMIT_NEW_COMMENT + ERROR:
        return {
          ...state,
          formLoading: false
        }

    default:
      return state;
  }
}

/* Selectors */
const stateSelector = state => state[namespace];

export const commentsDataSelector = createSelector(
  stateSelector,
  state => Object.values(state.data)
)

export const commentsLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const openedSelector = createSelector(
  stateSelector,
  state => state.opened
)

export const commentsFormLoadingSelector = createSelector(
  stateSelector,
  state => state.formLoading
)

/* action creators */

export function loadAllComments() {
  return {
    type: LOAD_ALL_COMMENTS,
    fetch: {
      url: API_URL + '/api/comment'
    }
  }
}

export function toggleComments(id) {
  return {
    type: TOGGLE_COMMENTS,
    payload: { id }
  }
}

export function submitNewComment(data) {
  return {
    type: SUBMIT_NEW_COMMENT,
    fetch: {
      url: API_URL + '/api/comment',
      options: {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    }
  }
}

/* Sagas */
export function* watchSubmitComment() {
  yield takeEvery(SUBMIT_NEW_COMMENT, fetchNewComment);
}

function* fetchNewComment() {
  try {
    yield put(requestDog());
    const data = yield call(() => {
      return fetch('https://dog.ceo/api/breeds/image/random')
              .then(res => res.json())
      }
    );
    yield put(requestDogSuccess(data));
  } catch (error) {
    yield put(requestDogError());
  }
}


export default reducer
