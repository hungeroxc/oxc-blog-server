export as namespace IArticle

export interface Item extends IBase.Item {
    id: number
    // 内容
    content: string
    // 标题
    title: string
    // 查看数
    viewCount: number
    // 标签
    tags: ITag.Item[]
    // 对应评论
    comments: IComment.Item[]
}
