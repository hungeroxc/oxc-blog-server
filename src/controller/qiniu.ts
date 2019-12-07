import qiniu from 'qiniu'
import { Context } from 'koa'

const ak = process.env.QINIUAK
const sk = process.env.QINIUSK
const bucket = 'oxc-blog-img'

const QiniuController = {
    qiniuUpload(ctx: Context) {
        const mac = new qiniu.auth.digest.Mac(ak, sk)
        const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
        const uploadToken = putPolicy.uploadToken(mac)
        ctx.body = { data: { token: uploadToken } }
    }
}

export default QiniuController
