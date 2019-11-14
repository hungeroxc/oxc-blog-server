import { UserController } from './../controller/index'

export interface RouteItem {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    action: any
}

export const AppRoutes: RouteItem[] = [
    {
        path: '/register',
        method: 'post',
        action: UserController.register
    },
    {
        path: '/login',
        method: 'post',
        action: UserController.login
    }
]
