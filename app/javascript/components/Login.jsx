import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../apis";
import {
	getCurrentUser,
	setAuthToken,
	setCurrentUser,
} from "../utils/localStorage";

const styles = {
	paper: {
		width: "100%",
		minHeight: "100vh",
		background: "linear-gradient(90deg, #C7C5F4, #776BCC)",
	},
	card: {
		marginTop: "15%",
		minHeight: "600px",
		minWidth: "360px",
	},
	form: {
		margin: "15%",
	},
	title: {
		textAlign: "center",
		color: "#4C489D",
	},
	input: {
		marginBottom: "15px",
	},
	button: {
		marginBottom: "15px",
	},
};
const Login = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [user, setUser] = useState(getCurrentUser());
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const userRes = await signIn({ user: form });
			if (userRes && userRes.data.status.code === 200) {
				setCurrentUser(userRes.data.status.data);
				setAuthToken(userRes.headers.authorization);
				setTimeout(() => {
					navigate("/");
				}, 1000);
			} else {
				alert(userRes.data.message || "Something went wrong!!");
			}
		} catch (error) {
			alert("Something went wrong!!");
		}
	};

	return (
		<Paper sx={styles.paper}>
			<Grid
				container
				spacing={2}
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item xs={12} md={3}></Grid>
				<Grid item xs={12} md={6}>
					<Card sx={styles.card} raised={true}>
						<form style={styles.form} onSubmit={handleSubmit}>
							<Grid item xs={12}>
								<Typography sx={styles.title} variant="h2" gutterBottom>
									Sign In
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									sx={styles.input}
									required
									fullWidth={true}
									name="email"
									type="email"
									label="Email"
									defaultValue={form.email}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									sx={styles.input}
									required
									fullWidth={true}
									name="password"
									type="password"
									label="Password"
									defaultValue={form.password}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									sx={styles.button}
									fullWidth={true}
									type="submit"
									variant="contained"
								>
									Log In
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6" gutterBottom>
									Don't have account? <Link to="/sign-up">Sign up now!</Link>
								</Typography>
							</Grid>
						</form>
					</Card>
				</Grid>
				<Grid item xs={12} md={3}></Grid>
			</Grid>
		</Paper>
	);
};

export default Login;
