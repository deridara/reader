import { combineReducers } from 'redux'

import comments from './comments'
import filters from './filters'
import articles from './articles'

export default combineReducers({
  comments,
  filters,
  articles
})
