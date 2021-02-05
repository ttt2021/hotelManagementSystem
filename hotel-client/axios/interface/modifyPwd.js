import axios from '../api'

const modifyPwd = (data) => {
	return axios({
		url: '/modifyPwd',
		method: 'post',
		data
	})
}

export default {
	modifyPwd
}