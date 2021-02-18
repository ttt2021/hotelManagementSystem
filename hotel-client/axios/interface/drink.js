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

export default {
	addDrinking,
	getDrinkList,
	updateDrink,
	delDrink
}