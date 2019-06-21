/* 
    工具函数
*/
//验证密码
export function pwdReg(value){
    const reg = /^[A-Za-z0-9]+$/;
    return reg.test(value)//正则内置方法，返回value值得true或false
}