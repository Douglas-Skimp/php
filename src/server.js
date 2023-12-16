import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { json } from './middleware/json.js'
import { routes } from './routes.js'

// UUID => Unique Universal ID


const database = new Database

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const routes = routes.find(route => {
      return route.method === method && route.path === url 
    })
  
    return res.writeHead(404).end()
  })

server.listen(3333)