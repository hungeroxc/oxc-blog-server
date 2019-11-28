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
            .getMany()
        ctx.body = { data: tagList }
    }
}

export default TagController
