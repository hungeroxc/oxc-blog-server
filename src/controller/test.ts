import { Context } from 'koa'

const TestController = {
    test: async (ctx: Context) => {
        console.log('接收到了')
        ctx.status = 200
        ctx.body = 'hello'
    }
}

export default TestController
