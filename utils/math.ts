export const splitNumber = (str: string, index: number) => {
	const numbers = str.split("x"); // This will give you an array ['312', '312']

	// If you want only the first number, you can do:
	const result = numbers[index]; // This will give you '312'
	return Number(result);
};

export const convertSizeToString = (_v: ImageSize) => {
	return `${_v.width}x${_v.height}`;
};

export const randomNumber = (max: number) => {
	return Math.floor(Math.random() * max);
};
