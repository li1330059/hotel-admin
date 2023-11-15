import request from '@/utils/request'

export function getHotelList(params) {
  return request({
    url: '/admin/hotel/orderlist',
    method: 'post',
    params
  })
}

export function getTicketList(params) {
  return request({
    url: '/admin/ticket/orderlist',
    method: 'post',
    params
  })
}

export function getRefundList(params) {
  return request({
    url: '/admin/refund/orderlist',
    method: 'post',
    params
  })
}
