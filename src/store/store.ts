import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { appReducer } from './reducer/appReducer'
import { commentReducer } from './reducer/commentReducer'
import { storyReducer } from './reducer/storyReducer'

const rootReducer = combineReducers({
  app: appReducer,
  story: storyReducer,
  comment: commentReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//@ts-ignore
window.store = store
