import axios from '../api'

const getDataInfo = (data) => {
	return axios({
		url: '/getDataInfo',
		method: 'post',
		data
	})
}

const getRestRoom = (data) => {
	return axios({
		url: '/getRestRoom',
		method: 'post',
		data
	})
}

const latestOrderList = (data) => {
	return axios({
		url: '/latestOrderList',
		method: 'post',
		data
	})
}

const latestOrdeUserList = (data) => {
	return axios({
		url: '/latestOrdeUserList',
		method: 'post',
		data
	})
}

const getImgList = (data) => {
	return axios({
		url: '/getImgList',
		method: 'post',
		data
	})
}

export default {
	getDataInfo,
	getRestRoom,
	latestOrderList,
	latestOrdeUserList,
	getImgList
}