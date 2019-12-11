import { Context } from 'koa'
import { getManager } from 'typeorm'

import { User } from './../entity'
import { encrypt, comparePassword } from './../utils/bcrypt'
import { createToken } from './../utils/token'
import { getOrderByStatus } from './../utils/getOrderByStatus'

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
                ctx.throw(400, '用户名已被注册')
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
            ctx.throw(400, '用户名和密码不能为空')
        }
    },

    async login(ctx: Context) {
        const { username, password } = ctx.request.body
        const userRepository = getManager().getRepository(User)
        const user = await userRepository.findOne({ where: { username } })

        let res
        if (!user) {
            ctx.throw(400, '用户不存在')
        } else {
            const isMatch = await comparePassword(password, user.password)
            if (!isMatch) {
                ctx.throw(400, '密码不正确')
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
    },

    // 获取用户列表
    async getList(ctx: Context) {
        const { page = 1, pageSize = 10, sortName = 'createdAt', sortType, keyword } = ctx.query
        const userRepository = getManager().getRepository(User)
        const orderByStatus = getOrderByStatus('user', sortName, sortType)
        const users = await userRepository
            .createQueryBuilder('user')
            .skip(pageSize * (page - 1))
            .take(pageSize)
            .select(['user.auth', 'user.id', 'user.createdAt', 'user.username'])
            .where('user.auth != 2')
            .orderBy({
                [orderByStatus.sortName]: orderByStatus.sortType
            })
            .where('user.username like :username', { username: `%${!!keyword ? keyword : ''}%` })
            .andWhere('user.auth like :auth', { auth: 1 })
            .getManyAndCount()
        ctx.body = { data: { list: users[0], total: users[1], current: Number(page) } }
    },

    // 删除用户
    async deleteUserById(ctx: Context) {
        const { id } = ctx.query
        const userRepository = getManager().getRepository(User)
        await userRepository.delete({ id })
        ctx.body = { code: 200, message: '删除成功' }
    }
}

export default UserController
