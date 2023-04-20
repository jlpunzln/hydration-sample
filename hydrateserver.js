import express from 'express';
import { renderToString } from 'vue/server-renderer';
import { createHydratedApp } from './app.js';

const server = express()
const app = createHydratedApp()
server.get('/', (req, res) => {
  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hydrated Page</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <p> The number will increase per click</p>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.use(express.static('.'));

server.listen(3000);
