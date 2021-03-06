import axios from '../api'

const addDrinking = (data) => {
	return axios({
		url: '/addDrinking',
		method: 'post',
		data
	})
}

const getDrinkList = () => {
	return axios({
		url: '/getDrinkList',
		method: 'post'
	})
}

const updateDrink = (data) => {
	return axios({
		url: '/updateDrink',
		method: 'post',
		data
	})
}

const delDrink = (data) => {
	return axios({
		url: '/delDrink',
		method: 'post',
		data
	})
}

const checkDrinkList = (data) => {
	return axios({
		url: '/checkDrinkList',
		method: 'post',
		data
	})
}

const updateDrinkList = (data) => {
	return axios({
		url: '/updateDrinkList',
		method: 'post',
		data
	})
}

export default {
	addDrinking,
	getDrinkList,
	updateDrink,
	delDrink,
	checkDrinkList,
	updateDrinkList
}