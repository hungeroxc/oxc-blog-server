import jwt from 'jsonwebtoken'
import { Context } from 'koa'

import { AuthItem } from './../middlewares/authHandler'

const TOKEN_SECRET_KEY = 'oxc-blog'
const TOKEN_EXPIRESIN = '24h'

interface UserInfo {
    username: string
    id: number
    auth: number
}

// 创建token
export const createToken = (userInfo: UserInfo) => {
    const token = jwt.sign(userInfo, TOKEN_SECRET_KEY, { expiresIn: TOKEN_EXPIRESIN })
    return token
}

// 检测token权限
export const checkToken = (ctx: Context, authList: AuthItem[]): boolean => {
    let isPass = false
    const verify = (token: string): any => {
        return jwt.verify(token, TOKEN_SECRET_KEY, (err: Error, decoded: { auth: 1 | 2 }) => {
            if (err) {
                return false
            } else if (!!decoded) {
                const target = authList.find((item: AuthItem) => item.auth === decoded.auth)
                return !!target
            }
            return false
        })
    }

    for (const item of authList) {
        if (item.verifyTokenBy === 'headers') {
            const authorizationHeader = ctx.headers['authorization']

            if (!!authorizationHeader) {
                const token = authorizationHeader.split(' ')[1]
                const result = verify(token)
                if (result) {
                    isPass = true
                    break
                }
            } else {
                const { token } = ctx.query
                if (token) {
                    const t = token.split(' ')[1]
                    const result = verify(t)
                    if (result) {
                        isPass = true
                        break
                    }
                }
            }
        }
    }

    return isPass
}
