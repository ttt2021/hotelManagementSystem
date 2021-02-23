import axios from '../api'

const getDayStatistics = (data) => {
	return axios({
		url: '/getDayStatistics',
		method: 'post',
		data
	})
}

const getRangeStatistics = (data) => {
	return axios({
		url: '/getRangeStatistics',
		method: 'post',
		data
	})
}

const getYearStatistics = (data) => {
	return axios({
		url: '/getYearStatistics',
		method: 'post',
		data
	})
}

export default {
	getDayStatistics,
	getRangeStatistics,
	getYearStatistics
}