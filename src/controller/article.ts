import { Context } from 'koa'
import { getManager } from 'typeorm'
import { xorBy } from 'lodash'

import { Article, Tag } from './../entity'
import { getOrderByStatus } from './../utils/getOrderByStatus'

type TagItem = { value: string }

const ArticleController = {
    // 新增文章
    async createArticle(ctx: Context) {
        const { title, content, tags = [] } = ctx.request.body
        const articleRepository = getManager().getRepository(Article)
        const tagRepository = getManager().getRepository(Tag)
        if (!!title && !!content) {
            let res
            const checkArticle = await articleRepository.findOne({ title })
            if (!!checkArticle) {
                ctx.status = 400
                res = { message: '该文章已存在' }
            } else {
                // 存储tags并返回结果
                const tagList: TagItem[] = tags.map((t: string) => ({ value: t }))
                const filterExistTag = await tagRepository.find({ where: tagList })
                const tempTags = xorBy(tagList, filterExistTag, 'value')
                const tagsRes = await tagRepository.save(tempTags)

                const newArticle = articleRepository.create({
                    title,
                    content,
                    viewCount: 0,
                    tags: [...tagsRes, ...filterExistTag]
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
        const { page = 1, pageSize = 10, keyword, sortName = 'createdAt', sortType, tag } = ctx.query
        const orderByStatus = getOrderByStatus('article', sortName, sortType)
        const articleRepository = getManager().getRepository(Article)

        let filterProcess
        if (!!tag) {
            filterProcess = await articleRepository
                .createQueryBuilder('article')
                .innerJoinAndSelect('article.tags', 'tag', 'tag.value = :value', { value: tag })
        } else {
            filterProcess = await articleRepository
                .createQueryBuilder('article')
                .leftJoinAndSelect('article.tags', 'tag')
        }

        const articles = await filterProcess
            .where('article.title like :title', { title: `%${!!keyword ? keyword : ''}%` })
            .orderBy({
                [orderByStatus.sortName]: orderByStatus.sortType
            })
            .skip(pageSize * (page - 1))
            .take(pageSize)
            .getManyAndCount()

        ctx.body = { data: { list: articles[0], total: articles[1], current: Number(page) } }
    },

    // 单个文章获取
    async getArticleById(ctx: Context) {
        const { id } = ctx.query
        const articleRepository = getManager().getRepository(Article)
        const targetArticle = await articleRepository.findOne({ where: { id }, relations: ['tags'] })
        // 点一次加一次
        targetArticle.viewCount = targetArticle.viewCount + 1
        const article = await articleRepository.save(targetArticle)
        ctx.body = { data: article, message: '获取成功' }
    },

    // 删除文章
    async deleteArticleById(ctx: Context) {
        const { id } = ctx.query
        const articleRepository = getManager().getRepository(Article)
        await articleRepository.delete({ id })
        ctx.body = { code: 200, message: '删除成功' }
    },

    // 更新文章
    async updateArticle(ctx: Context) {
        const { content, title, id, tags = [] } = ctx.request.body
        const articleRepository = getManager().getRepository(Article)
        const tagRepository = getManager().getRepository(Tag)
        // 存储tags并返回结果
        const tagList: TagItem[] = tags.map((t: string) => ({ value: t }))
        const filterExistTag = await tagRepository.find({ where: tagList })
        const tempTags = xorBy(tagList, filterExistTag, 'value')
        const tagsRes = await tagRepository.save(tempTags)

        // 使用save进行文章更新，因为save包含update功能，但是同时效率较低
        // 如果使用的是update，那么需要先解除该文章相对于标签的关联，再进行保存，这样步骤会多两步
        // 目前还未找到更好的办法
        const existArticle = (await articleRepository.findByIds(id))[0]
        existArticle.content = content
        existArticle.title = title
        existArticle.tags = !!tags.length ? [...tagsRes, ...filterExistTag] : []
        await articleRepository.save(existArticle)
        ctx.body = { message: '更新成功' }
    }
}

export default ArticleController
