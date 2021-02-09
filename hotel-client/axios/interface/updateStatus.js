import axios from '../api'

const updateStatus = (data) => {
	return axios({
		url: '/updateStatus',
		method: 'post',
		data
	})
}

export default {
	updateStatus
}