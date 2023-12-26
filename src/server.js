import http from 'node:http'

import { json } from './middleware/json.js'
import { routes } from './routes.js'

// Query Parameters
// Route Parameters
// Request Body

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const routes = routes.find(route => {
      return route.method === method && route.path === url 
    })

    if(route) {
      const routeParams = req.url.match(route.path)

      req.params = { ...routeParams.group }
      
      return route.handler(req, res)
    }
  
    return res.writeHead(404).end()
  })

server.listen(3333)