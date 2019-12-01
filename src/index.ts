import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'
import cors from 'koa2-cors'

import { AppRoutes } from './routes'
import checkAuthFun from './middlewares/authHandler'
import errorHandler from './middlewares/errorHandler'

createConnection()
    .then(() => {
        const app = new Koa()
        const router = new Router()
        const port = process.env.PORT || 3000

        // 注册路由
        AppRoutes.forEach(route => router[route.method](route.path, route.action))

        app.use(cors())
            .use(bodyParser())
            .use(checkAuthFun)
            .use(errorHandler)
            .use(router.routes())
            .use(router.allowedMethods())

        app.listen(port)
    })
    .catch(error => console.log('TypeORM 链接失败: ', error))
