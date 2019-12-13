import { Context } from 'koa'

import { checkToken } from './../utils/token'

export interface VerifyListItem {
    regexp: RegExp
    required: string
}

export interface AuthItem {
    auth: 1 | 2
    verifyTokenBy: string
}

// 管理员权限
const verifyList: VerifyListItem[] = [
    { regexp: /\/article/, required: 'post put delete' },
    { regexp: /\/user/, required: 'get put delete' },
    { regexp: /\/qiniu/, required: 'all' },
    { regexp: /\/discuss/, required: 'delete' }
]

// 检测路由是否需要权限，返回列表
const checkAuth = (method: string, url: string) => {
    const verify = (list: VerifyListItem[]) => {
        const target = list.find(v => {
            return v.regexp.test(url) && (v.required === 'all' || v.required.toUpperCase().includes(method))
        })
        return target
    }

    const authList: AuthItem[] = []
    const res = verify(verifyList)

    // 管理员才能用的方法
    !!res && authList.push({ auth: 2, verifyTokenBy: 'headers' })
    return authList
}

const checkAuthFun = async (ctx: Context, next: () => Promise<any>) => {
    const authList = checkAuth(ctx.method, ctx.url)
    if (authList.length > 0) {
        if (checkToken(ctx, authList)) {
            await next()
        } else {
            ctx.throw(403, '无权限进行操作')
        }
    } else {
        await next()
    }
}

export default checkAuthFun
