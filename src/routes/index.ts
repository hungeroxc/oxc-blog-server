import { Test } from './../controller/index'

export interface RouteItem {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    action: any
}

export const AppRoutes: RouteItem[] = [
    {
        path: '/test',
        method: 'get',
        action: Test.test
    }
]
