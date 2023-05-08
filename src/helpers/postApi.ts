import _ky from "ky";

const ky = _ky.extend({
	headers: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Authorization: `Basic ${btoa(":lxis3000")}`,
	},
});
/** 10min in ms */
const timeout = 600_000;

export type Context = {
	text: string;
	uuid: string;
};

export type Answer = {
	answer: string;
	context: Context[];
};

export const submitQuestion = async (question: string): Promise<Answer> => (ky
	.post(
		"https:/ai-poc-server/docs/chat",
		{ json: { message: question }, timeout },
	)
	.json()
);

export type UploadResponse = {

	message?: string;
	uuid: string;
};

export const uploadFiles = async (file: File): Promise<UploadResponse> => {
	const data = new FormData();
	data.append("file", file);

	return ky
		.post(
			"https://ai-poc-server.onrender.com/docs/upload-mock",
			{ body: data, timeout },
		)
		.json();
};
