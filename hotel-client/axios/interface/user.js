import axios from '../api'

const addUser = (data) => {
	return axios({
		url: '/addUser',
		method: 'post',
		data
	})
}

export default {
	addUser
}