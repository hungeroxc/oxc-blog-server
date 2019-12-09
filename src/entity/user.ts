import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import BaseEntity from './base'
import { Comment, Reply } from './index'

@Entity()
class User extends BaseEntity implements IUser.Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    username: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'tinyint', width: 4 })
    auth: 1 | 2

    @OneToMany(
        () => Comment,
        comment => comment.user
    )
    comments: Comment[]

    @OneToMany(
        () => Reply,
        reply => reply.replyUser
    )
    replies: Reply[]
}

export default User
