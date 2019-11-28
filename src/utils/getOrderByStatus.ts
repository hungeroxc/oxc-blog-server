interface OrderStatus {
    sortName: string
    sortType: 'DESC' | 'ASC'
}

export const getOrderByStatus = (dataName: string, sortName: string, sortType: 'DESC' | 'ASC'): OrderStatus => {
    const orderByStatus: OrderStatus = {
        sortName: `${dataName}.${sortName}`,
        sortType: 'DESC'
    }

    if (!!sortType) {
        orderByStatus.sortType = sortType
    }
    return orderByStatus
}
