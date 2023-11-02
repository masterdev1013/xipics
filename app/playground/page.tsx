"use client";
import { useState, useEffect } from "react";
import Settings from "@/components/user/settings/Settings";
import Output from "@/components/user/Output";
import Icon from "@/components/Icon";
import { randomNumber } from "@/utils/math";
import { toast } from "react-toastify";
import { SAMPLER_LIST } from "@/constants";
import UserTextArea from "@/components/basic/UserTextArea";
import ImageItemSelect from "@/components/basic/ImageItemSelect";
import CustomButton from "@/components/basic/CustomButton";
import api from "@/configs/api";
import { useAppContext } from "@/context/AppContext";
import { useXLoading } from "@/context/XLoadingContext";
import { getRandomseedModels } from "@/apis/models";
import { IMAGE_SIZE } from "@/constants";

export default function Page() {
	const { startLoading, stopLoading } = useXLoading();
	const [size, setSize] = useState<ImageSize>(IMAGE_SIZE[0]);
	const [loras, setLoras] = useState<string>("");
	const [prompt, setPrompt] = useState<Prompt>({
		_id: "",
		name: "",
		prompt: "",
		negativePrompt: ""
	});
	const [model_name, setModel_name] = useState<string>("");
	const [models, setModels] = useState<Model[]>([]);
	const [selectedFile, setSelectedFile] = useState("");
	const [output, setOutput] = useState<string[]>([]);
	const [templates, setTemplates] = useState<Template[]>([]);
	const initialTemplate: Template = {
		_id: "",
		name: "",
		model: null,
		prompts: [],
		thumbnail: {
			name: "",
			link: ""
		},
		imageNumber: 1,
		stepNumber: 30,
		guidanceScale: 7.5,
		sampler: SAMPLER_LIST[0],
		width: IMAGE_SIZE[0].width,
		height: IMAGE_SIZE[0].height,
		loras: "",
		loraScale: 7.5
	};
	const [selectedTemplate, setSelectedTemplate] =
		useState<Template>(initialTemplate);

	const [generateSetting, setGenerateSetting] = useState<GSettingsType>({
		imageNumber: 0,
		stepNumber: 0,
		guidanceScale: 0,
		strength: 0.5,
		sampler: "",
		seed: -1,
		loraScale: 0
	});

	const [loadingState, setLoadingState] = useState(false);
	const [context] = useAppContext();
	useEffect(() => {
		startLoading();
		getTemplates();
		getModels();
	}, [context]);

	useEffect(() => {
		setPrompt(selectedTemplate.prompts[0]);
		setLoras(selectedTemplate.loras === null ? "" : selectedTemplate.loras);
		setModel_name(selectedTemplate.model?.modelName as string);
		setSize({
			width: selectedTemplate.width,
			height: selectedTemplate.height
		});
		setGenerateSetting({
			...generateSetting,
			imageNumber:
				selectedTemplate.imageNumber === null
					? 1
					: selectedTemplate.imageNumber,
			stepNumber:
				selectedTemplate.stepNumber === null ? 30 : selectedTemplate.stepNumber,
			guidanceScale:
				selectedTemplate.guidanceScale === null
					? 7
					: selectedTemplate.guidanceScale,
			sampler:
				selectedTemplate.sampler === null
					? "Euler a"
					: selectedTemplate.sampler,
			loraScale:
				selectedTemplate.loraScale === null ? 0.75 : selectedTemplate.loraScale
		});
	}, [selectedTemplate]);

	let txt_data = {
		txt2img: {
			prompt: prompt?.prompt,
			negative_prompt: prompt?.negativePrompt,
			width: size.width, // has to be a whole number.
			height: size.height, // has to be a whole number.
			number_of_images: generateSetting.imageNumber,
			steps: generateSetting.stepNumber,
			cfg_scale: generateSetting.guidanceScale,
			sampler_name: generateSetting.sampler,
			seed: generateSetting.seed,
			model_name: `${model_name}.safetensors`,
			highres_fix_method: "Latent"
		}
	};

	const getModels = async () => {
		try {
			const models = await getRandomseedModels();
			setModels(models.filter((item: any) => item.isActive));
			stopLoading();
		} catch (err) {
			console.error(err);
			stopLoading();
		}
	};

	const handleSubmit = async () => {
		if (!context.auth) {
			window.location.href = "https://www.buymeacoffee.com/xipics";
			return;
		}
		if (loadingState === false) {
			if (loras !== "") {
				const parseData = txt_data;
				parseData.txt2img.prompt += ` <lora:${loras}:${generateSetting.loraScale}>`;
				txt_data = parseData;
			}
			setLoadingState(true);
			api
				.post("/randomseed/txt2img", txt_data)
				.then(res => {
					setLoadingState(false);
					if (res.data.message) {
						toast.success(res.data.message);
					}
					if (res.data.output) {
						setOutput(res.data.output);
					} else {
						console.error("Response data is undefined");
					}
				})
				.catch(err => {
					toast.error("Randomseed Server Error!");
					setLoadingState(false);
					console.error(`Randomseed Text to Image ERR => ${err}`);
				});
		}
	};

	const getTemplates = async () => {
		try {
			const res = await api.get("/templates");
			setTemplates(res.data);
			if (res.data.length !== 0) setSelectedTemplate(res.data[0]);
			stopLoading();
		} catch (error: unknown) {
			toast.warning(error as string);
		}
	};

	// Choose the prompt randomly
	const handleChooseRandomPrompt = () => {
		setPrompt(
			selectedTemplate.prompts[randomNumber(selectedTemplate.prompts.length)]
		);
	};

	return (
		<>
			<div className="flex w-full flex-col justify-around p-4 md:flex-row">
				<div className="w-full p-10 md:w-1/2">
					<ImageItemSelect
						options={templates.map(item => ({
							src: item.thumbnail.link,
							name: item.name,
							id: item._id,
							value: item
						}))}
						value={{
							id: selectedTemplate._id as string,
							src: selectedTemplate.thumbnail.link,
							name: selectedTemplate.name,
							value: selectedTemplate
						}}
						onSelect={(e: any) => setSelectedTemplate(e)}
						title="Select Template"
					/>

					{/* Prompt Start */}
					<UserTextArea
						title="Prompt"
						value={prompt?.prompt}
						onChange={e =>
							setPrompt({
								...prompt,
								prompt: e.target.value
							})
						}
					/>
					{/* Prompt End */}

					{/* Negative Prompt Start */}
					<UserTextArea
						title="Negative Prompt"
						value={prompt?.negativePrompt}
						onChange={e =>
							setPrompt({
								...prompt,
								negativePrompt: e.target.value
							})
						}
					/>
					{/* Negative Prompt End */}

					{/*  */}
					<div className="flex items-center justify-center pt-2 text-white">
						<button
							type="button"
							className="flex"
							onClick={handleChooseRandomPrompt}
						>
							<Icon icon={"TwoDice"} />
							<p className="pl-2 pt-1">Random Prompt</p>
						</button>
					</div>
					{/*  */}

					{/* Generation Settings Start */}
					<Settings
						generationSettings={generateSetting}
						setGenerationSettings={setGenerateSetting}
						models={models}
						selectedFile={selectedFile}
						setSelectedFile={setSelectedFile}
						loras={loras}
						setLoras={setLoras}
						modelName={model_name}
						setModelName={setModel_name}
						filteredModels={models.filter(v => v.modelType === "Lora")}
						size={size}
						setSize={setSize}
					/>

					<CustomButton loading={loadingState} onClick={handleSubmit}>
						Generate
					</CustomButton>
				</div>
				<Output
					loadingState={loadingState}
					output={output}
					width={size.width}
					height={size.height}
				/>
			</div>
		</>
	);
}
