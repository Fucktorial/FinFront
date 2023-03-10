import fs from 'fs'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from 'App'
import { Html } from './Html/Server'

const PORT = process.env.PORT || 3000;
const server = express()
const jsFiles: Array<string> = []

fs.readdirSync('./dist/assets').forEach(file => {
    if (file.split('.').pop() === 'js') jsFiles.push('/assets/' + file)
})

server.use('/assets', express.static('./dist/assets'))

server.get('*', async (req, res) => {
    ReactDOMServer.renderToPipeableStream(<Html scripts={jsFiles}>
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    </Html>).pipe(res)
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
