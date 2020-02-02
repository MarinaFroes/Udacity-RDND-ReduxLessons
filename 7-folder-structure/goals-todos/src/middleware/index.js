import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

import checker from './checker'
import logger from './logger'

export default applyMiddleware(
  thunk,
  checker,
  logger
)
