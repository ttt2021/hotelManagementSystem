import axios from '../api'

const getComment = (data) => {
	return axios({
		url: '/getComment',
		method: 'post',
		data
	})
}

const getCommentList = (data) => {
	return axios({
		url: '/getCommentList',
		method: 'post',
		data
	})
}

const delComment = (data) => {
	return axios({
		url: '/delComment',
		method: 'post',
		data
	})
}

const commentsList = () => {
	return axios({
		url: '/commentsList',
		method: 'post'
	})
}

const searchComment = (data) => {
	return axios({
		url: '/searchComment',
		method: 'post',
		data
	})
}

const getMyComments = (data) => {
	return axios({
		url: '/getMyComments',
		method: 'post',
		data
	})
}

const getMyCommentsList = (data) => {
	return axios({
		url: '/getMyCommentsList',
		method: 'post',
		data
	})
}

export default {
	getComment,
	getCommentList,
	delComment,
	commentsList,
	searchComment,
	getMyComments,
	getMyCommentsList
}