import axios from '../api'

const uploadArticle = (data) => {
	return axios({
		url: '/uploadArticle',
		method: 'post',
		data
	})
}

const getArticleList = (data) => {
	return axios({
		url: '/getArticleList',
		method: 'post',
		data
	})
}

const delArticle = (data) => {
	return axios({
		url: '/delArticle',
		method: 'post',
		data
	})
}

const getArticleInfo = (data) => {
	return axios({
		url: '/getArticleInfo',
		method: 'post',
		data
	})
}

const updatedArticle = (data) => {
	return axios({
		url: '/updatedArticle',
		method: 'post',
		data
	})
}

const searchArticle = async (data) => {
	return axios({
		url: '/searchArticle',
		method: 'post',
		data
	})
}

const updateView = async (data) => {
	return axios({
		url: '/updateView',
		method: 'post',
		data
	})
}

const getCheckList = async (data) => {
	return axios({
		url: '/getCheckList',
		method: 'post',
		data
	})
}

const updatedStatus = async (data) => {
	return axios({
		url: '/updatedStatus',
		method: 'post',
		data
	})
}

export default {
	uploadArticle,
	getArticleList,
	delArticle,
	getArticleInfo,
	updatedArticle,
	searchArticle,
	updateView,
	getCheckList,
	updatedStatus
}