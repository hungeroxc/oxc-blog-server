import {
    UserController,
    ArticleController,
    TagController,
    QiniuController,
    CommentController,
    ReplyController
} from './../controller/index'

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
    // 评论相关
    {
        path: '/api/discuss/publish',
        method: 'post',
        action: CommentController.createComment
    },
    {
        path: '/api/discuss/delete',
        method: 'delete',
        action: CommentController.deleteComment
    },
    {
        path: '/api/discuss/reply',
        method: 'post',
        action: ReplyController.createReply
    },
    {
        path: '/api/discuss/reply/delete',
        method: 'delete',
        action: ReplyController.deleteReply
    },
    // 七牛上传凭证
    {
        path: '/api/qiniu/token',
        method: 'get',
        action: QiniuController.qiniuUpload
    }
]
