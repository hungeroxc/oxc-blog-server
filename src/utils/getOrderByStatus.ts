interface OrderStatus {
    sortName: string
    sortType: 'DESC' | 'ASC'
}

export const getOrderByStatus = (sortName: string, sortType: 'DESC' | 'ASC'): OrderStatus => {
    const orderByStatus: OrderStatus = {
        sortName: 'createdAt',
        sortType: 'DESC'
    }

    if (!!sortName) {
        orderByStatus.sortName = sortName
    }
    if (!!sortType) {
        orderByStatus.sortType = sortType
    }
    return orderByStatus
}
