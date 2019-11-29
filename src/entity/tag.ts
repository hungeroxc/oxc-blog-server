import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Article } from './index'

@Entity()
class Tag implements ITag.Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100, unique: true })
    value: string

    @ManyToMany(
        () => Article,
        article => article.tags
    )
    articles: Article[]
}

export default Tag
