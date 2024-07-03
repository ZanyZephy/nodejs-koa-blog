const qiniu = require('qiniu')
const ACCESS_KEY = 'SZihxM8UWxx8GbmBFYWEVwKSz8doF0Ur3cVFsJvK';
const SECRET_KEY = 'dE57K_DPZW2Ex4Gyod_p-6vl-3uhrtTcE6bzdJ09';
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

const { Auth } = require('@middlewares/auth');
const AUTH_ADMIN = 16;

const { Resolve } = require('@lib/helper');
const res = new Resolve();

const Router = require('koa-router')

const router = new Router({
    prefix: '/api/v1'
})

// 创建回复
router.post('/upload/token', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // console.log('mac', mac)
    const options = {
        scope: 'test-blog',
        expires: 7200
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    ctx.response.status = 200;
    const data = {
        token: putPolicy.uploadToken(mac)
    }
    ctx.body = res.json(data)
})

module.exports = router

