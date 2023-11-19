import request from '@/utils/request'

export function getHotelList(data) {
  return request({
    url: '/admin/hotel/list',
    method: 'post',
    data,
  })
}

export function getHotelAdd(data) {
  return request({
    url: '/admin/hotel/add',
    method: 'post',
    data,
  })
}

export function getHotelEdit(data) {
  return request({
    url: '/admin/hotel/edit',
    method: 'post',
    data,
  })
}

export function getHotelDel(data) {
  return request({
    url: '/admin/hotel/del',
    method: 'post',
    data,
  })
}

export function getHotelDetail(data) {
  return request({
    url: '/admin/hotel/detail',
    method: 'post',
    data,
  })
}

export function getRoomList(data) {
  return request({
    url: '/admin/room/list',
    method: 'post',
    data,
  })
}

export function getRoomDel(data) {
  return request({
    url: '/admin/room/del',
    method: 'post',
    data,
  })
}

export function getRoomAdd(data) {
  return request({
    url: '/admin/room/add',
    method: 'post',
    data,
  })
}

export function getRoomEdit(data) {
  return request({
    url: '/admin/room/edit',
    method: 'post',
    data,
  })
}

export function getRoomDetail(data) {
  return request({
    url: '/admin/room/detail',
    method: 'post',
    data,
  })
}

