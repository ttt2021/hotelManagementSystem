import axios from '../api'

const showPositionInfo = () => {
	return axios({
		url: '/showPositionInfo',
		method: 'post'
	})
}

export default {
	showPositionInfo
}