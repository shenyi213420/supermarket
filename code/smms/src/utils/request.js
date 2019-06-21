// 封装get和post
//引入axios
import axios from 'axios'
//引入qs
import qs from 'qs'

//引入封装的本地存储
import local from '@/utils/local'

//设置默认请求服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:4399'

//在axios的请求发送出去之前，头部携带token
axios.interceptors.request.use(config=>{
    //获取本地存储
    let token = local.get("ls-token:")
    //给头部携带token
    config.headers.authorization = `Bearer ${token}` 
    return config
})


//暴露
export default{
    get(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params})
            .then(response=>{
                resolve(response.data);//成功用resolve
                
            })
            .catch(err=>{
                // console.log(reject);//失败用reject
                reject(err)
                
            })
        })
    },
    post(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(params))
            .then(response=>{
               resolve(response.data)
                
            })
            .catch(err=>{
                reject(err)
                
            })
        })
    }
    
}