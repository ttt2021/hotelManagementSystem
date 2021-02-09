import axios from '../api'

const addPosition = (data) => {
	return axios({
		url: '/addPosition',
		method: 'post',
		data
	})
}

export default {
	addPosition
}