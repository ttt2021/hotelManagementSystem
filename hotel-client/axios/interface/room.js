import axios from '../api'

const addRoomKind = (data) => {
	return axios({
		url: '/addRoomKind',
		method: 'post',
		data
	})
}

const getRoomKind = (data) => {
	return axios({
		url: '/getRoomKind',
		method: 'post'
	})
}

const getKindImg = (data) => {
	return axios({
		url: '/getKindImg',
		method: 'post',
		data
	})
}

const updatedRoomKind = (data) => {
	return axios({
		url: '/updatedRoomKind',
		method: 'post',
		data
	})
}

const addRoom = (data) => {
	return axios({
		url: '/addRoom',
		method: 'post',
		data
	})
}

const getRoomList = (data) => {
	return axios({
		url: '/getRoomList',
		method: 'post'
	})
}

const delRoom = (data) => {
	return axios({
		url: '/delRoom',
		method: 'post',
		data
	})
}

const updatedRoom = (data) => {
	return axios({
		url: '/updatedRoom',
		method: 'post',
		data
	})
}

const searchRoom = (data) => {
	return axios({
		url: '/searchRoom',
		method: 'post',
		data
	})
}

const getKindRoom = (data) => {
	return axios({
		url: '/getKindRoom',
		method: 'post',
		data
	})
}

const getOrderRoom = (data) => {
	return axios({
		url: '/getOrderRoom',
		method: 'post'
	})
}

const searchOrderRoom = (data) => {
	return axios({
		url: '/searchOrderRoom',
		method: 'post',
		data
	})
}

const orderRoom = (data) => {
	return axios({
		url: '/orderRoom',
		method: 'post',
		data
	})
}

const getRoomInfo = (data) => {
	return axios({
		url: '/getRoomInfo',
		method: 'post',
		data
	})
}

const bookRoomInfo = (data) => {
	return axios({
		url: '/bookRoomInfo',
		method: 'post',
		data
	})
}

const getBookList = (data) => {
	return axios({
		url: '/getBookList',
		method: 'post',
		data
	})
}

const cancelBook = (data) => {
	return axios({
		url: '/cancelBook',
		method: 'post',
		data
	})
}

const getBookInfo = (data) => {
	return axios({
		url: '/getBookInfo',
		method: 'post',
		data
	})
}

const updatedBookInfo = (data) => {
	return axios({
		url: '/updatedBookInfo',
		method: 'post',
		data
	})
}

const getOrderList = (data) => {
	return axios({
		url: '/getOrderList',
		method: 'post'
	})
}

const searchOrderList = (data) => {
	return axios({
		url: '/searchOrderList',
		method: 'post',
		data
	})
}

const getCheckOutInfo = (data) => {
	return axios({
		url: '/getCheckOutInfo',
		method: 'post',
		data
	})
}

const getCheckOutList = (data) => {
	return axios({
		url: '/getCheckOutList',
		method: 'post',
		data
	})
}

const cancelCheckOut = (data) => {
	return axios({
		url: '/cancelCheckOut',
		method: 'post',
		data
	})
}

const updateCheckInfo = (data) => {
	return axios({
		url: '/updateCheckInfo',
		method: 'post',
		data
	})
}

const checkedOut = (data) => {
	return axios({
		url: '/checkedOut',
		method: 'post',
		data
	})
}

const adjustBook = (data) => {
	return axios({
		url: '/adjustBook',
		method: 'post',
		data
	})
}

const adjustCheckedOut = (data) => {
	return axios({
		url: '/adjustCheckedOut',
		method: 'post',
		data
	})
}

const getHistoricalList = (data) => {
	return axios({
		url: '/getHistoricalList',
		method: 'post',
		data
	})
}

const searchHistoryList = (data) => {
	return axios({
		url: '/searchHistoryList',
		method: 'post',
		data
	})
}

export default {
  addRoomKind,
	getRoomKind,
	getKindImg,
	updatedRoomKind,
	addRoom,
	getRoomList,
	delRoom,
	updatedRoom,
	searchRoom,
	getKindRoom,
	getOrderRoom,
	searchOrderRoom,
	orderRoom,
	getRoomInfo,
	bookRoomInfo,
	getBookList,
	cancelBook,
	getBookInfo,
	updatedBookInfo,
	getOrderList,
	searchOrderList,
	getCheckOutInfo,
	getCheckOutList,
	cancelCheckOut,
	updateCheckInfo,
	checkedOut,
	adjustBook,
	adjustCheckedOut,
	getHistoricalList,
	searchHistoryList
}