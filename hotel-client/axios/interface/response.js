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

export default {
	getResponse,
	delResponse
}