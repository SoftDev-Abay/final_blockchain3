const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('../backend/src/routes');
const connectDB = require('./src/config/db');
const bodyParser = require('body-parser');
const { initializeProgram } = require('./src/api/solanaFriendship');

dotenv.config();

const app = express();
const port = process.env.PORT || 4040;

app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());
app.use(bodyParser.json());

app.use('/', routes);

async function startServer() {
	try {
		await connectDB();
		await initializeProgram();
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	} catch (error) {
		console.error('Failed to start the server:', error);
	}
}

startServer();
