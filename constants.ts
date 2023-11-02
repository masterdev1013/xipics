export const IMAGE_WIDTHS = [512, 768];

export const IMAGE_SIZE: Array<ImageSize> = [
	{
		width: 512,
		height: 512
	},
	{
		width: 768,
		height: 512
	},
	{
		width: 512,
		height: 768
	}
];

export const SAMPLER_LIST = [
	"Euler a",
	"Euler",
	"LMS",
	"Heun",
	"DPM2",
	"DPM2 a",
	"DPM++ 2S a",
	"DPM++ 2M",
	"DPM ++ SDE",
	"DPM fast",
	"DPM adaptive",
	"LMS Karras",
	"DPM2 a Karras",
	"DPM++ 2S a Karras",
	"DPM++ 2M Karras",
	"DPM++ SDE Karras",
	"DDIM",
	"PLMS",
	"UniPC"
];

export const DEFAULT_NEGATIVE_PROMPT =
	"(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck";
