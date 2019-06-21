//引入工具函数
import req from '@/utils/request'

//账号添加
export function accountAdd(params){
    return req.post('/account/accountadd',params)
}

//账号编辑
export function accounteditor(params){
    return  req.get("/account/accounteditor", params)
}

//保存编辑
export function accountedit(params){
    return req.post( "/account/accountedit",params)
}

//单条删除
export function accountdel(params){
    return  req.get("/account/accountdel",params)
}

//批量删除
export function batchdelete(params){
    return  req.get("/account/batchdelete",params)
}

//分页
export function accountpage(params){
    return  req.get("/account/accountpage", params)
}

//原密码
export function oldPassword(params){
    return req.post("account/oldpassword",params)
}

//密码修改
export function revampPass(params){
    return req.post("account/revamppass",params)
}

//用户信息
export function getInfo(){
    return req.get("/account/getinfo")
}

//用户权限
export function getRole(){
    return req.get("/account/role")
}