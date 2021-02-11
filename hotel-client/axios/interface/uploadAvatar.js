import axios from '../api'

const uploadAvatar = (data) => {
	return axios({
		url: '/uploadAvatar',
		method: 'post',
		data
	})
}

const getAvatar = (data) => {
	return axios({
		url: '/getAvatar',
		method: 'post',
		data
	})
}

export default {
	uploadAvatar,
	getAvatar
}