export as namespace ITag

export interface Item {
    id: number
    // 内容
    value: string
    // 对应文章
    articles: IArticle.Item[]
}
