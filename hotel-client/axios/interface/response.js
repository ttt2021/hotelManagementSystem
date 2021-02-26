import axios from '../api'

const getResponse = (data) => {
	return axios({
		url: '/getResponse',
		method: 'post',
		data
	})
}

const delResponse = (data) => {
	return axios({
		url: '/delResponse',
		method: 'post',
		data
	})
}

const responsesList = (data) => {
	return axios({
		url: '/responsesList',
		method: 'post',
		data
	})
}

const searchResponse = (data) => {
	return axios({
		url: '/searchResponse',
		method: 'post',
		data
	})
}

export default {
	getResponse,
	delResponse,
	responsesList,
	searchResponse
}