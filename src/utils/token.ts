import jwt from 'jsonwebtoken'

const TOKEN_SECRET_KEY = 'oxc-blog'
const TOKEN_EXPIRESIN = '720h'

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
