import { DB_NAME, MONGO_URI } from "@/configs/env.config";
import mongoose, { ConnectionStates } from "mongoose";

// Connect flag
let isConnected: ConnectionStates = 0;

/**
 * @desc Check if mongodb is already connected and connect to the DB
 */
export const connectDb = async () => {
	if (isConnected) {
		return;
	}

	try {
		const db = await mongoose.connect(
			`${MONGO_URI}/${DB_NAME}?retryWrites=true&w=majority`
		);

		isConnected = db.connections[0].readyState;
	} catch (error) {
		console.error("Could not connect to DB:", error);
		process.exit(1);
	}
};

/**
 * @desc Disconnect from DB
 */
const disconnectDb = async () => {
	await mongoose.connection.close();
	console.info("MongoDB Disconnected!");
};

// Disconnect from the DB if the process is off
process.on("disconnect", disconnectDb);
