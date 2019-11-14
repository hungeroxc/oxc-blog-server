import { Context } from 'koa'
import { getManager } from 'typeorm'

import { User } from './../entity'
import { encrypt, comparePassword } from './../utils/bcrypt'
import { createToken } from './../utils/token'

const UserController = {
    // 注册
    async register(ctx: Context) {
        const { username, password } = ctx.request.body
        const userRepository = getManager().getRepository(User)
        if (!!username && !!password) {
            // 检测user是否存在
            const checkUser = await userRepository.findOne({ username })
            let res
            if (!!checkUser) {
                ctx.status = 400
                res = { message: '用户名已被注册' }
            } else {
                const saltPassword = await encrypt(password)
                const newUser = userRepository.create({
                    username,
                    password: saltPassword,
                    auth: 1
                })
                await userRepository.save(newUser)
                res = { message: '注册成功' }
            }
            ctx.body = res
        } else {
            ctx.status = 400
            ctx.body = { message: '用户名和密码不能为空' }
        }
    },

    async login(ctx: Context) {
        const { username, password } = ctx.request.body
        const userRepository = getManager().getRepository(User)
        const user = await userRepository.findOne({ where: { username } })

        let res
        if (!user) {
            ctx.status = 400
            res = { message: '用户不存在' }
        } else {
            const isMatch = await comparePassword(password, user.password)
            if (!isMatch) {
                ctx.status = 400
                res = { message: '密码不正确' }
            } else {
                const { id, auth } = user
                const token = createToken({ username, id, auth })
                const data = {
                    username,
                    auth: user.auth,
                    token,
                    id
                }
                res = { message: '登陆成功', data }
            }
        }
        ctx.body = res
    }
}

export default UserController
