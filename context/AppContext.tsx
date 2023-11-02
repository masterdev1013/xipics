import React, { Dispatch, SetStateAction } from "react";

interface Auth {
	token: string;
	isAuthenticated: boolean;
	user: {
		email: string;
		expiresIn: string;
		isAdmin: boolean;
	};
}

interface State {
	auth: null | Auth;
	checkingStatus: boolean;
}

const initialState: State = {
	auth: null,
	checkingStatus: true
};

const AppContext = React.createContext<
	[State, Dispatch<SetStateAction<State>>] | undefined
>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
	const [state, setState] = React.useState(initialState);

	return (
		<AppContext.Provider value={[state, setState]}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = React.useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within a AppContext Provider");
	}
	return context;
}
