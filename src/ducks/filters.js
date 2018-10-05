import moment from 'moment'
import { createSelector } from 'reselect'
import { appName } from '../config'

const initialState = {
  title: "",
  dates: [1465160400000, 1465592400000]
}

const namespace = 'filters'
const prefix = `${appName}/${namespace}`

const SET_TITLE = `${prefix}/SET_TITLE`
const SET_DATE_RANGE = `${prefix}/SET_DATE_RANGE`


/*  reducer  */

function reducer(state = initialState, { type, payload }) {
  switch(type) {

    case SET_TITLE:
      return {
        ...state,
        title: payload.title
      }

    case SET_DATE_RANGE:
      return {
        ...state,
        dates: payload.dates
      }

    default:
      return state;
  }
}

/* Selectors */
const stateSelector = state => state[namespace]

export const filterTitleSelector = createSelector(
  stateSelector,
  state => state.title
)

export const filterDatesSelector = createSelector(
  stateSelector,
  state => state.dates
)


/* action creators */

export function setTitle(title) {
  return {
    type: SET_TITLE,
    payload: { title }
  }
}

export function setDateRange(dates = []) {
  return {
    type: SET_DATE_RANGE,
    payload: { dates }
  }
}


export default reducer
