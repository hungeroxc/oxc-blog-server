import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

import BaseEntity from './base'
import { Tag } from './../entity'

@Entity()
class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'varchar', length: 255 })
    title: string

    @Column({ type: 'int', nullable: true })
    viewCount: number

    @ManyToMany(
        () => Tag,
        tag => tag.articles
    )
    @JoinTable()
    tags: Tag[]
}

export default Article
