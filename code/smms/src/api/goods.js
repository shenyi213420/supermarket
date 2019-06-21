//引入工具函数
import req from '@/utils/request'

//商品添加
export function goodsAdd(params){
    return req.post('/goods/goodsadd',params)
}

//商品列表
export function goodsList(params){
    return req.get('/goods/goodslist',params)
}

//商品删除
export function goodsDel(params){
    return req.get('/goods/goodsdelete',params)
}

//批量删除
export function goodsBatchDel(params){
    return req.get('/goods/goodbatches',params)
}

//商品编辑
export function goodsEditor(params){
    return req.get('/goods/goodeditor',params)
}

//保存修改
export function goodsEdit(params){
    return req.post('/goods/goodsedit',params)
}

//模糊查询
export function fuzzySearch(params){
    return req.get('/goods/fuzzysearch',params)
}

//统计列表
export function getSellData(params){
    return req.get('/goods/getselldata',params)
}