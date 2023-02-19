import React, { useState, useEffect } from "react";
import {
	Box,
	Grid,
	Paper,
	Card,
	ListItem,
	List,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	Divider,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NavBar from "./NavBar";
import { getReferrals, referUser } from "../apis";

const styles = {
	box: {
		flexGrow: 1,
		width: "100%",
		minHeight: "100vh",
		margin: "-8px",
	},
	paper: {
		margin: "5%",
	},
	card: {},
	title: {
		textAlign: "center",
		color: "#4C489D",
	},
	button: {
		margin: "10px",
	},
	list: {
		width: "100%",
	},
};

const Home = () => {
	const [referrals, setReferrals] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [email, setEmail] = useState("");

	const fetchReferrals = async () => {
		try {
			const referralsRes = await getReferrals();
			console.log();
			if (referralsRes && referralsRes.status === 200) {
				setReferrals(referralsRes.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchReferrals();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setEmail("");
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const referRes = await referUser({ email });
			console.log(referRes);
			if (referRes && referRes.status === 200) {
				alert(referRes.data.message);
				setTimeout(() => {
					handleClose();
					fetchReferrals();
				}, 1000);
			} else {
				alert(referRes.data.message || "Something went wrong");
			}
		} catch (error) {
			console.log(error);
			alert(error.response.data.message || "Something went wrong");
		}
	};

	return (
		<Box sx={styles.box}>
			<Grid spacing={2}>
				<Grid item xs={12}>
					<NavBar />
				</Grid>
				<Grid item xs={12}>
					<Paper sx={styles.paper}>
						<Card sx={styles.card}>
							<Grid
								container
								spacing={3}
								direction="row"
								justifyContent="center"
								alignItems="center"
							>
								<Grid item xs>
									<Typography sx={styles.title} variant="h4" gutterBottom>
										Referred Users
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Button
										sx={styles.button}
										variant="contained"
										color="primary"
										onClick={handleClickOpen}
									>
										Refer Now
									</Button>
								</Grid>
							</Grid>
							<List sx={styles.list}>
								{referrals.map((referral) => {
									return (
										<div key={referral.id}>
											<ListItem>
												<ListItemAvatar>
													<Avatar
														alt={referral.name}
														src="/static/images/avatar/2.jpg"
													/>
												</ListItemAvatar>
												<ListItemText
													primary={referral.name}
													secondary={referral.email}
												/>
											</ListItem>
											<Divider variant="inset" component="li" />
										</div>
									);
								})}
							</List>
						</Card>
					</Paper>
				</Grid>
			</Grid>
			<Dialog open={open} onClose={handleClose}>
				<form onSubmit={handleSubmit}>
					<DialogTitle>Refer a Friend and Earn Rewards!</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Do you know someone who would benefit from our service? Refer them
							now and receive exclusive rewards for each successful referral!
							Simply fill out the form with your friend's details and we'll take
							care of the rest. Don't miss out on this opportunity to share the
							love and earn great benefits!
						</DialogContentText>

						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Email Address"
							type="email"
							fullWidth
							required
							name="email"
							variant="standard"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="contained" color="primary" type="submit">
							Send Invite
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Box>
	);
};

export default Home;
