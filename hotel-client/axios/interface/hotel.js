import axios from '../api'

const updateHotelInfos = (data) => {
	return axios({
		url: '/updateHotelInfos',
		method: 'post',
		data
	})
}

const getHotelInfo = (data) => {
	return axios({
		url: '/getHotelInfo',
		method: 'post'
	})
}

export default {
	updateHotelInfos,
	getHotelInfo
}