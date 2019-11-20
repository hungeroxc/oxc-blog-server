import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'varchar', length: 255 })
    title: string

    @Column({ type: 'int' })
    viewCount: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

export default Article
