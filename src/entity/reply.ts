import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import BaseEntity from './base'
import { User, Comment } from './index'

@Entity()
class Reply extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    targetUsername: string

    @ManyToOne(
        () => User,
        user => user.replies
    )
    replyUser: User

    @ManyToOne(
        () => Comment,
        comment => comment.replies
    )
    comment: Comment
}

export default Reply
