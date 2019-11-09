import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'

createConnection()
    .then(async () => {
        const app = new Koa()
        const router = new Router()
        const port = process.env.PORT || 3000

        app.use(bodyParser()).use(router.routes())

        app.listen(port)
    })
    .catch(error => console.log('TypeORM 链接失败: ', error))
