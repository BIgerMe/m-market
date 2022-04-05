import request from '@/utils/request'
//省市区
export async function pca(){
  return request({
    url: '/z/address/pca',
    method: 'get',
  })
}
//选择地址信息
export function select() {
  return request({
    url: '/z/address/select',
    method: 'get'
  })
}
//选择地址信息
export function doSelect(data) {
  return request({
    url: '/z/address/doSelect',
    method: 'post',
    data
  })
}
//用户地址信息
export function detail(data) {
  return request({
    url: '/z/address/detail',
    method: 'get',
    params:data
  })
}
//用户地址信息
export function list() {
  return request({
    url: '/z/address/list',
    method: 'get',
  })
}
//用户地址信息
export function add(data) {
  return request({
    url: '/z/address/add',
    method: 'post',
    data
  })
}
//用户地址信息
export function update(data) {
  return request({
    url: '/z/address/update',
    method: 'post',
    data
  })
}
//用户地址信息
export function del(data) {
  return request({
    url: '/z/address/del',
    method: 'post',
    data
  })
}

