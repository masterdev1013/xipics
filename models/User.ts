import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
	name: string;
	email: string;
	password: string;
	isAdmin?: boolean;
	isActive?: boolean;
	comparePassword(_passcode: string): Promise<boolean>;
}

const UserSchema = new Schema<User>({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address"
		]
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	isActive: {
		type: Boolean,
		default: true
	}
});

UserSchema.pre("save", async function (next) {
	const user = this as User;

	if (!user.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);

	const hash = await bcrypt.hash(user.password, salt);

	user.password = hash;

	next();
});

UserSchema.methods.comparePassword = function (enteredPassword: string) {
	const user = this as User;
	return bcrypt.compareSync(enteredPassword, user.password);
};

let Users: mongoose.Model<any, object, object, object, any, any>;

try {
	Users = mongoose.model<User>("users");
} catch (error) {
	Users = mongoose.model<User>("users", UserSchema);
}

export default Users;
