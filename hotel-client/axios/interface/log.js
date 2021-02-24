import axios from '../api'

const getHomeLogList = (data) => {
	return axios({
		url: '/getHomeLogList',
		method: 'post',
		data
	})
}

const getLogList = (data) => {
	return axios({
		url: '/getLogList',
		method: 'post',
		data
	})
}

const searchLogList = (data) => {
	return axios({
		url: '/searchLogList',
		method: 'post',
		data
	})
}

export default {
	getHomeLogList,
	getLogList,
	searchLogList
}