import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	config => config,
	err => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
	response => response.data,
	error => Promise.reject(error)
);

export default axiosInstance;
