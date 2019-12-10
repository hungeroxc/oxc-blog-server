export as namespace IReply

export interface ITem extends IBase.Item {
    id: number
    // 内容
    content: string
    // 目标用户名
    targetUsername?: string
    // 回复用户
    replyUser?: IUser.Item
    // 在某个评论下
    comment?: IComment.Item
}
