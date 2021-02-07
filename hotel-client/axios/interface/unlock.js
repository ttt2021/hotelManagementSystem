import axios from '../api'

const unlock = (data) => {
	return axios({
		url: '/unlock',
		method: 'post',
		data
	})
}

export default {
	unlock
}