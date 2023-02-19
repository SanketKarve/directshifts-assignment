import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../../components/Home";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import { getCurrentUser } from "../../utils/localStorage";

function PrivateRoute({ children, ...rest }) {
	let currentUser = getCurrentUser();
	if (!currentUser) {
		// not logged in so redirect to login page with the return url
		return <Navigate to="/sign-in" state={{ from: history.location }} />;
	}

	// authorized so return child components
	return children;
}

const Index = () => {
	const theme = createTheme({
		palette: {
			primary: {
				main: "#4C489D",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path="/sign-in" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default Index;
