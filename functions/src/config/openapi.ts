import { resolve } from 'path'
import * as YAML from 'yamljs'
import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types'

export const getOpenApiSpec = () => YAML.load(resolve(__dirname, '../openapi.yml')) as OpenAPIV3.Document
