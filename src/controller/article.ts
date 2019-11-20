import { Context } from 'koa'
import { getManager } from 'typeorm'

import { Article } from './../entity'

const ArticleController = {
    // 新增文章
    async createArticle(ctx: Context) {
        const { title, content } = ctx.request.body
        const articleRepository = getManager().getRepository(Article)
        if (!!title && !!content) {
            let res
            const checkArticle = await articleRepository.findOne({ title })
            if (!!checkArticle) {
                ctx.status = 400
                res = { message: '该文章已存在' }
            } else {
                const newArticle = articleRepository.create({
                    title,
                    content,
                    viewCount: 0
                })
                await articleRepository.save(newArticle)
                res = { message: '创建文章成功' }
                ctx.body = res
            }
        } else {
            ctx.status = 400
            ctx.body = { message: '文章不符合规格' }
        }
    }
}

export default ArticleController
