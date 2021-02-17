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

export default {
  addRoomKind,
	getRoomKind,
	getKindImg
}