import axios from '../api'

const updatePositionInfo = (data) => {
	return axios({
		url: '/updatePositionInfo',
		method: 'post',
		data
	})
}

export default {
	updatePositionInfo
}