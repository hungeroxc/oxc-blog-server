import { UserController, ArticleController, TagController, QiniuController } from './../controller/index'

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
        path: '/api/user/list',
        method: 'get',
        action: UserController.getList
    },
    {
        path: '/api/user/delete',
        method: 'delete',
        action: UserController.deleteUserById
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
    },
    {
        path: '/api/article/delete',
        method: 'delete',
        action: ArticleController.deleteArticleById
    },
    {
        path: '/api/article/update',
        method: 'put',
        action: ArticleController.updateArticle
    },
    {
        path: '/api/tag/list',
        method: 'get',
        action: TagController.getList
    },
    {
        path: '/api/test',
        method: 'get',
        action: TagController.test
    },
    // 七牛上传凭证
    {
        path: '/api/qiniu/token',
        method: 'get',
        action: QiniuController.qiniuUpload
    }
]
