import { Context } from 'koa'
import { getManager } from 'typeorm'

import { Tag } from './../entity'

const TagController = {
    async getList(ctx: Context) {
        const tagRepository = getManager().getRepository(Tag)
        const tagList = await tagRepository
            .createQueryBuilder('tag')
            .leftJoinAndSelect('tag.articles', 'article')
            .loadRelationCountAndMap('tag.count', 'tag.articles')
            .select(['tag.id', 'tag.value', 'article.id', 'article.title'])
            .getMany()
        ctx.body = { data: tagList }
    },
    async test(ctx: Context) {
        ctx.body = { message: '请求成功' }
    }
}

export default TagController
