export const REQUEST = '_REQUEST'
export const SUCCESS = '_SUCCESS'
export const ERROR = '_ERROR'

const fetch = store => next => action => {

  if (!action.fetch) {
      return next(action)
  }

  const { url, options } = action.fetch

  store.dispatch({
      type: action.type + REQUEST
  })

  window.fetch(url, options).then(res => res.json()).then(payload => {
    setTimeout(() => store.dispatch({
        type: action.type + SUCCESS,
        payload
    }), 600)

  }).catch(error => {
    store.dispatch({
        type: action.type + ERROR,
        error
    })
  })
}

export default fetch
