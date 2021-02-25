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

export default {
	getComment,
	getCommentList,
	delComment
}