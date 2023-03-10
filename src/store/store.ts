import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { appReducer, commentReducer, storyReducer } from './reducer'

const rootReducer = combineReducers({
  app: appReducer,
  story: storyReducer,
  comment: commentReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
