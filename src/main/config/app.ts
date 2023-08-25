import express from 'express'
import setupStatic from './static'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupStatic(app)
setupMiddlewares(app)
setupRoutes(app)
export default app