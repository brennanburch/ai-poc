import ky from "ky";

// eslint-disable-next-line @typescript-eslint/naming-convention
const getOrCreateUUID = () => {
	const localStorageKey = "userUUID";

	// eslint-disable-next-line @typescript-eslint/naming-convention
	let userUUID = localStorage.getItem(localStorageKey);

	if (!userUUID) {
		userUUID = crypto.randomUUID();
		localStorage.setItem(localStorageKey, userUUID);
	}

	return userUUID;
};

const getCustomOpenAiApiKey = () => localStorage.getItem("openai-api-key") ?? "";

/** 10min in ms */
const timeout = 600_000;

export type Context = {
	text: string;
	title: string;
};

export type Answer = {
	answer: string;
	context: Context[];
	tokens: number;
};

// TODO: cancelable? custom messages? body -> json

export const submitQuestion = async (question: string, model: string): Promise<Answer> => {
	const uuid = getOrCreateUUID();
	const data = new FormData();

	data.append("question", question);
	data.append("model", model);
	data.append("apikey", getCustomOpenAiApiKey());
	data.append("uuid", uuid);

	return ky
		.post("/api/questions", { body: data, timeout })
		.json();
};

export type UploadResponse = {
	message: string;
	num_files_succeeded: number;
	num_files_failed: number;
	successful_file_names: string[];
	failed_file_names: Record<string, string>;
};

export const uploadFiles = async (files: File[]): Promise<UploadResponse> => {
	const uuid = getOrCreateUUID();
	const data = new FormData();

	for (const file of files) {
		data.append("files", file);
	}

	data.append("apikey", getCustomOpenAiApiKey());
	data.append("uuid", uuid);

	return ky
		.post("/api/upload", { body: data, timeout })
		.json();
};
