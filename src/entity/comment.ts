import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

import BaseEntity from './base'
import { Article, User, Reply } from './index'

@Entity()
class Comment extends BaseEntity implements IComment.Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @ManyToOne(
        () => Article,
        article => article.comments
    )
    article: Article

    @ManyToOne(
        () => User,
        user => user.comments
    )
    user: User

    @OneToMany(
        () => Reply,
        reply => reply.comment
    )
    replies: Reply[]
}

export default Comment
