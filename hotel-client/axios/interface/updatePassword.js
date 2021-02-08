import axios from '../api'

const updatePassword = (data) => {
	return axios({
		url: '/updatePassword',
		method: 'post',
		data
	})
}

export default {
	updatePassword
}