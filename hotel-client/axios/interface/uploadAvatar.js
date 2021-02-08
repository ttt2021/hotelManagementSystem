import axios from '../api'

const uploadAvatar = (data) => {
	return axios({
		url: '/uploadAvatar',
		method: 'post',
		data
	})
}

export default {
	uploadAvatar
}