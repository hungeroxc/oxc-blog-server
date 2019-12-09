export as namespace IComment

export interface Item extends IBase.Item {
    id: number
    // 内容
    content: string
    // 对应文章
    article: IArticle.Item
    // 对应用户
    user: IUser.Item
}
