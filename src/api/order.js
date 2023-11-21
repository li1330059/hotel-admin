import request from '@/utils/request'

export function getHotelList(data) {
  return request({
    url: '/admin/hotel/orderlist',
    method: 'post',
    data,
  })
}

export function getTicketList(data) {
  return request({
    url: '/admin/ticket/orderlist',
    method: 'post',
    data
  })
}

export function getRefundList(data) {
  return request({
    url: '/admin/refund/orderlist',
    method: 'post',
    data
  })
}

export function setRefund(data) {
  return request({
    url: '/admin/refund',
    method: 'post',
    data
  })
}

export function setNoRefund(data) {
  return request({
    url: '/admin/refund/order',
    method: 'post',
    data
  })
}

export function exportHotel(params) {
  console.dir(request.defaults.baseURL + 'admin/export/hotel/orderlist?startTime=' + params.startTime + '&endTime=' + params.endTime)
  window.location.href = request.defaults.baseURL + 'admin/export/hotel/orderlist?startTime=' + params.startTime + '&endTime=' + params.endTime
  return
}
