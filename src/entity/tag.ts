import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Unique } from 'typeorm'
import { Article } from './index'

@Entity()
@Unique(['value'])
class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100 })
    value: string

    @ManyToMany(
        () => Article,
        article => article.tags
    )
    articles: Article[]
}

export default Tag
