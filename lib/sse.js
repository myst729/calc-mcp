import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import express from 'express'
import { createServer } from './server.js'

const app = express()
const { server, cleanup } = createServer()
let transport

app.get('/sse', async (req, res) => {
  console.log('Received connection')
  transport = new SSEServerTransport('/message', res)
  await server.connect(transport)

  server.onclose = async () => {
    await cleanup()
    await server.close()
    process.exit(0)
  }
})

app.post('/message', async (req, res) => {
  console.log('Received message')
  await transport.handlePostMessage(req, res)
})

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})
