import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import BaseEntity from './base'
import { User, Comment } from './index'

@Entity()
class Reply extends BaseEntity implements IReply.ITem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    targetUsername: string

    @ManyToOne(
        () => User,
        user => user.replies,
        { onDelete: 'CASCADE' }
    )
    replyUser: User

    @ManyToOne(
        () => Comment,
        comment => comment.replies,
        { onDelete: 'CASCADE' }
    )
    comment: Comment
}

export default Reply
