import { createStore, compose, applyMiddleware } from 'redux'
import ducks from './ducks'
import middlewares from './middlewares'
import createSagaMiddleware from 'redux-saga'
import { watchSubmitComment } from './ducks/comments'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = applyMiddleware(...middlewares, sagaMiddleware)
// const store = createStore(ducks, composeEnhancers(enhancers))
const store = createStore(ducks, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchSubmitComment)

export default store

//
//
// // create the saga middleware
// const sagaMiddleware = createSagaMiddleware()
// // mount it on the Store
// const store = createStore(
//   reducer,
//   applyMiddleware(sagaMiddleware)
// )
//
// // then run the saga
// sagaMiddleware.run(mySaga)
//
// // render the application
