import { Context } from 'koa'
import { getManager } from 'typeorm'

import { User, Reply, Comment } from './../entity/index'

const ReplyController = {
    async createReply(ctx: Context) {
        const { content, userId, commentId, targetUserInfo } = ctx.request.body
        const userRepository = getManager().getRepository(User)
        const replyRepository = getManager().getRepository(Reply)
        const commentRepository = getManager().getRepository(Comment)
        // 找出对应user和comment
        const targetUser = await userRepository.findOne({ where: { id: userId }, relations: ['replies'] })
        const targetComment = await commentRepository.findOne({ where: { id: commentId }, relations: ['replies'] })
        // 新建reply并存入
        const newReply = replyRepository.create({
            content,
            targetUsername: !!targetUserInfo ? targetUserInfo.username : null
        })
        await replyRepository.save(newReply)
        targetUser.replies = [...targetUser.replies, newReply]
        targetComment.replies = [...targetComment.replies, newReply]
        await userRepository.save(targetUser)
        await commentRepository.save(targetComment)

        const resReply = await replyRepository
            .createQueryBuilder('reply')
            .leftJoinAndSelect('reply.replyUser', 'replyUser')
            .select([
                'reply.createdAt',
                'reply.id',
                'reply.content',
                'reply.targetUsername',
                'replyUser.id',
                'replyUser.username'
            ])
            .where('reply.id like :id', { id: newReply.id })
            .getOne()

        ctx.body = { data: resReply }
    },
    // 删除评论
    async deleteReply(ctx: Context) {
        const { id } = ctx.query
        const replyRepository = getManager().getRepository(Reply)
        await replyRepository.delete({ id })
        ctx.body = { message: '删除成功' }
    }
}

export default ReplyController
