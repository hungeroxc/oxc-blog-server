import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    username: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'tinyint', width: 4 })
    auth: number

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}

export default User
