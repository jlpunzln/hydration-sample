import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Non Hydrated Page</title>
      </head>
      <body>
        <p> The number will not increase no matter how many times you click the button</p>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000)