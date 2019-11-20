import { UserController, ArticleController } from './../controller/index'

export interface RouteItem {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    action: any
}

export const AppRoutes: RouteItem[] = [
    {
        path: '/api/register',
        method: 'post',
        action: UserController.register
    },
    {
        path: '/api/login',
        method: 'post',
        action: UserController.login
    },
    {
        path: '/api/article/create',
        method: 'post',
        action: ArticleController.createArticle
    },
    {
        path: '/api/article/list',
        method: 'get',
        action: ArticleController.getArticleList
    },
    {
        path: '/api/article/detail',
        method: 'get',
        action: ArticleController.getArticleById
    }
]
