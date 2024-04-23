import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'


const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
})

sagaMiddleware.run(mySaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
