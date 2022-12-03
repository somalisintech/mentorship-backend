import * as express from 'express'
import * as cors from 'cors'
import * as OpenApiValidator from 'express-openapi-validator'
import * as swaggerUi from 'swagger-ui-express'
import * as bodyParser from 'body-parser'
import * as functions from 'firebase-functions'
import helmet from 'helmet'


import { createUser } from './api-handlers'
import { handleApiErrors } from './middleware/handle-api-errors'
import { authenticateUser } from './middleware/handle-api-authentication'
import { getOpenApiSpec } from './config/openapi'

const apiSpec = getOpenApiSpec()

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    ignorePaths: (path: string) => path.includes('/api-docs'),
    validateSecurity: {
      handlers: {
        BearerAuth: authenticateUser
      }
    }
  })
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(getOpenApiSpec()))
app.put('/users/:userId', createUser)

app.use(handleApiErrors)

exports.app = functions.region('europe-west3').https.onRequest(app)
