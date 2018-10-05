import moment from 'moment'
import { createSelector } from 'reselect'
import { appName, API_URL } from '../config'
import { REQUEST, SUCCESS, ERROR } from '../middlewares/fetch'
import { dataToEntities, isDateBetween } from '../utils'

const namespace = 'articles'
const prefix = `${appName}/${namespace}`

const LOAD_ALL_ARTICLES = `${prefix}/LOAD_ALL_ARTICLES`
const LOAD_ARTICLE = `${prefix}/LOAD_ARTICLE`
const TOGGLE_ARTICLE_TEXT = `${prefix}/TOGGLE_ARTICLE_TEXT`

const initialState = {
  data: {},
  opened: [],
  loading: false
}

/* reducer */
function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case LOAD_ALL_ARTICLES + REQUEST:
      return {
        ...state,
        loading: true
      }

    case LOAD_ALL_ARTICLES + SUCCESS:
      return {
        ...state,
        data: dataToEntities(payload),
        loading: false,
        currentlyDisplayed: payload.map(el => el.id)
      }

    case LOAD_ALL_ARTICLES + ERROR:
      return {
        ...state,
        loading: false
      }

    case LOAD_ARTICLE + SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.id]: payload
        }
      }

    case TOGGLE_ARTICLE_TEXT:
    return {
      ...state,
      opened: state.opened.includes(payload.id)
        ? state.opened.filter(id => id !== payload.id)
        : state.opened.concat(payload.id)
      }

    default:
      return state;
  }
}

/* Selectors */
const stateSelector = state => state[namespace]
export const dataSelector = createSelector(
  stateSelector,
  state => Object.values(state.data)
)
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)
export const openedSelector = createSelector(
  stateSelector,
  state => state.opened
)


/* action creators */
export function loadAllArticles() {
  return {
    type: LOAD_ALL_ARTICLES,
    fetch: {
      url: API_URL + '/api/article',
      options: {}
    }
  }
}

export function loadArticle(id) {
  return {
    type: LOAD_ARTICLE,
    fetch: {
      url: API_URL + '/api/article/' + id,
      options: {}
    },
    id
  }
}

export function toggleArticleText(id) {
  return {
    type: TOGGLE_ARTICLE_TEXT,
    payload: { id },
  }
}


export default reducer
