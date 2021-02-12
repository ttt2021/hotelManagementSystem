import axios from '../api'

const addUser = (data) => {
	return axios({
		url: '/addUser',
		method: 'post',
		data
	})
}

const getUserList = () => {
	return axios({
		url: '/getUserList',
		method: 'post'
	})
}

const getUserInfo = (data) => {
	return axios({
		url: '/getUserInfo',
		method: 'post',
		data
	})
}

const updatedUserinfo = (data) => {
	return axios({
		url: '/updatedUserinfo',
		method: 'post',
		data
	})
}

const searchUser = (data) => {
	return axios({
		url: '/searchUser',
		method: 'post',
		data
	})
}

const userUpdateInfo = (data) => {
	return axios({
		url: '/userUpdateInfo',
		method: 'post',
		data
	})
}

export default {
	addUser,
	getUserList,
	getUserInfo,
	updatedUserinfo,
	searchUser,
	userUpdateInfo
}