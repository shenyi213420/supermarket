//引入工具函数
import req from '@/utils/request'

//账号登录
export function checkLogin(params){
    return req.post('/login/checklogin',params)
}