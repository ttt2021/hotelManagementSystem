import axios from '../api'

const modifyPwd = (data) => {
	return axios({
		url: '/modifyPwd',
		method: 'post',
		data
	})
}

const updatePassword = (data) => {
	return axios({
		url: '/updatePassword',
		method: 'post',
		data
	})
}

export default {
	modifyPwd,
	updatePassword
}