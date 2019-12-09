export as namespace IUser

export interface Item extends IBase.Item {
    id: number
    // 用户名
    username: string
    // 密码
    password: string
    // 权限
    auth: 1 | 2
    // 对应评论
    comments: IComment.Item[]
}
