import { Context } from 'koa'
import { getManager } from 'typeorm'

import { Article, Comment, User } from './../entity/index'

const CommentController = {
    async createComment(ctx: Context) {
        const { articleId, content, userId } = ctx.request.body
        const articleRepository = getManager().getRepository(Article)
        const commentRepository = getManager().getRepository(Comment)
        const userRepository = getManager().getRepository(User)
        // 查询目标文章和用户
        const targetArticle = await articleRepository.findOne({ where: { id: articleId }, relations: ['comments'] })
        const targetUser = await userRepository.findOne({ where: { id: userId }, relations: ['comments'] })
        // 创建comment并存储
        const newComment = commentRepository.create({
            content
        })
        await commentRepository.save(newComment)
        // 存储到文章和用户中去
        targetArticle.comments = [...targetArticle.comments, newComment]
        targetUser.comments = [...targetUser.comments, newComment]
        await userRepository.save(targetUser)
        await articleRepository.save(targetArticle)
        // 查找最新评论发回去
        const resComment = await commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.replies', 'reply')
            .leftJoinAndSelect('comment.user', 'user')
            .where('comment.id like :id', { id: newComment.id })
            .select([
                'comment.createdAt',
                'comment.id',
                'comment.content',
                'reply.createdAt',
                'reply.id',
                'reply.content',
                'reply.targetUsername',
                'user.id',
                'user.username'
            ])
            .getOne()

        ctx.body = { data: resComment }
    },
    // 删除评论
    async deleteComment(ctx: Context) {
        const { id } = ctx.query
        const commentRepository = getManager().getRepository(Comment)
        await commentRepository.delete({ id })
        ctx.body = { message: '删除成功' }
    }
}

export default CommentController
