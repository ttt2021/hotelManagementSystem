import axios from '../api'

const logout = (data) => {
	return axios({
		url: '/logout',
		method: 'post',
		data
	})
}

export default {
	logout
}