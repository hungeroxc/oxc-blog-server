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
    },

    // 获取文章列表
    async getArticleList(ctx: Context) {
        const { page = 1, pageSize = 10, keyword, sortName, sortType } = ctx.query
        const getOrderByStatus = () => {
            const orderByStatus: { sortName: string; sortType: 'DESC' | 'ASC' } = {
                sortName: 'createdAt',
                sortType: 'DESC'
            }

            if (sortName) {
                orderByStatus.sortName = sortName
                orderByStatus.sortType = sortType
            }

            return orderByStatus
        }

        const orderByStatus = getOrderByStatus()
        const articleRepository = getManager().getRepository(Article)
        const articles = await articleRepository
            .createQueryBuilder('article')
            .where('article.title like :title', { title: `%${!!keyword ? keyword : ''}%` })
            .orderBy(orderByStatus.sortName, orderByStatus.sortType)
            .skip(pageSize * (page - 1))
            .take(pageSize)
            .getManyAndCount()
        ctx.body = { data: { list: articles[0], total: articles[1], current: Number(page) } }
    },

    // 单个文章获取
    async getArticleById(ctx: Context) {
        const { id } = ctx.query
        const articleRepository = getManager().getRepository(Article)
        const article = await articleRepository.findOne({ where: { id } })
        ctx.body = { data: article, message: '获取成功' }
    }
}

export default ArticleController
