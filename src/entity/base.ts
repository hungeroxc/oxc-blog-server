import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { getTimeTransformer } from './../utils/transformDate'

// 基类
abstract class BaseEntity {
    @CreateDateColumn({ type: 'timestamp', transformer: getTimeTransformer() })
    createdAt: string

    @UpdateDateColumn({
        type: 'timestamp',
        transformer: getTimeTransformer()
    })
    updatedAt: string
}

export default BaseEntity
