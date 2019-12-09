import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm'

import BaseEntity from './base'
import { Tag, Comment } from './../entity'

@Entity()
class Article extends BaseEntity implements IArticle.Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'varchar', length: 255 })
    title: string

    @Column({ type: 'int', nullable: true })
    viewCount: number

    @OneToMany(
        () => Comment,
        comment => comment.article
    )
    comments: Comment[]

    @ManyToMany(
        () => Tag,
        tag => tag.articles
    )
    @JoinTable()
    tags: Tag[]
}

export default Article
