import express from 'express'
import path from 'path'

import { ModuleMetadata } from 'botpress-module-sdk'

const app = express()

app.use(express.static('../static'))

app.get('/', (req, res) => {
  res.contentType('text/javascript')
  const root = path.resolve('.')
  res.sendFile('./static/channel-web.js', { root })
})

app.get('/register', (req, res) => {
  const metadata: ModuleMetadata = {
    name: 'channel-web',
    version: '1.0.0',
    incomingMiddleware: [
      {
        name: 'test.incoming.middleware',
        description: 'this is a test',
        order: 10,
        handler: 'test.middleware',
        module: 'channel-web',
        type: 'incoming'
      },
      {
        name: 'test.incoming.middleware2',
        description: 'this is a test2',
        order: 10,
        handler: 'test.middleware',
        module: 'channel-web',
        type: 'incoming'
      },
      {
        name: 'test.incoming.middleware3',
        description: 'this is a test3',
        order: 10,
        handler: 'test.middleware',
        module: 'channel-web',
        type: 'incoming'
      }
    ],
    outgoingMiddleware: [
      {
        name: 'test.outgoing.middleware',
        description: 'this is a test of an outgoing MW',
        order: 12,
        handler: 'test.middleware',
        module: 'channel-web',
        type: 'outgoing'
      }
    ]
  }
  res.send(metadata)
})

app.get('/channel-web/bots/:botId/messages', (req, res) => {
  const botId = req.params.botId
  res.send(botId)
})

export default app
