import request from '@/utils/request'

export function bannerAdd(data) {
  return request({
    url: '/admin/banner/add',
    method: 'post',
    data,
  })
}

export function bannerLabel(data) {
  return request({
    url: '/admin/banner/label',
    method: 'post',
    data,
  })
}

export function bannerDetail(data) {
  return request({
    url: '/admin/banner/detail',
    method: 'post',
    data,
  })
}

export function bannerEdit(data) {
  return request({
    url: '/admin/banner/edit',
    method: 'post',
    data,
  })
}

