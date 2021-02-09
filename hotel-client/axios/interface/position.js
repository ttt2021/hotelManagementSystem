import axios from '../api'

const addPosition = (data) => {
	return axios({
		url: '/addPosition',
		method: 'post',
		data
	})
}

const showPositionInfo = () => {
	return axios({
		url: '/showPositionInfo',
		method: 'post'
	})
}

const updatePositionInfo = (data) => {
	return axios({
		url: '/updatePositionInfo',
		method: 'post',
		data
	})
}

const updateStatus = (data) => {
	return axios({
		url: '/updateStatus',
		method: 'post',
		data
	})
}

const deletePosition = (data) => {
	return axios({
		url: '/deletePosition',
		method: 'post',
		data
	})
}

export default {
	addPosition,
  showPositionInfo,
  updatePositionInfo,
  updateStatus,
	deletePosition
}