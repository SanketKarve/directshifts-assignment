import axios from "axios";
import { getAuthToken } from "../utils/localStorage";

const instance = axios.create({
	baseURL: window.location.origin,
	timeout: 1000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
});

instance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		const token = getAuthToken();
		if (token) {
			instance.defaults.headers.common["Authorization"] = token;
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export const signUp = (data) => {
	return instance.post("/users", data);
};

export const signIn = (data) => {
	return instance.post("/users/sign_in", data);
};

export const signOut = (data) => {
	return instance.delete("/users/sign_out");
};

export const getReferrals = () => {
	return instance.get(`referral/referred-users`);
};

export const referUser = (data) => {
	return instance.post(`referral/refer-user`, data);
};
