export const getCurrentUser = () => {
	try {
		const currentUser = localStorage.getItem("USER");
		if (JSON.parse(currentUser)) {
			return JSON.parse(currentUser);
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

export const setCurrentUser = (data) => {
	localStorage.setItem("USER", JSON.stringify(data));
};

export const getAuthToken = () => {
	try {
		const authToken = localStorage.getItem("AUTH_TOKEN");
		if (JSON.parse(authToken)) {
			return JSON.parse(authToken);
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

export const setAuthToken = (data) => {
	localStorage.setItem("AUTH_TOKEN", JSON.stringify(data));
};
