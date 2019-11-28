import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

import BaseEntity from './base'

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    username: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'tinyint', width: 4 })
    auth: number
}

export default User
