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

export default {
  addRoomKind,
	getRoomKind,
	getKindImg,
	updatedRoomKind,
	addRoom,
	getRoomList,
	delRoom,
	updatedRoom
}