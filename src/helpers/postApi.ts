import _ky from "ky";

const ky = _ky.extend({
	headers: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Authorization: `Basic ${btoa(":lxis3000")}`,
	},
});

/** 10min in ms */
const timeout = 600_000;

type QuestionInput = {
	question: string;
	sessionId: string;
};

export type Context = {
	fileId: string;
	content: string;
};

export type Answer = {
	answer: string;
	context: Context[];
};

export const submitQuestion = async ({ question, sessionId }: QuestionInput): Promise<Answer> => (ky
	.post(
		"https://ai-poc-server.onrender.com/docs/chat-mock",
		{ json: { message: question, sessionId }, timeout },
	)
	.json()
);

type UploadInput = {
	file: File;
	sessionId: string;
};

export type UploadResponse = {
	message: string;
	fileId: string;
	sessionId?: string;
};

export const uploadFiles = async ({ file, sessionId }: UploadInput): Promise<UploadResponse> => {
	const data = new FormData();
	data.append("file", file);
	data.append("sessionId", sessionId);

	return ky
		.post(
			"https://ai-poc-server.onrender.com/docs/upload",
			{ body: data, timeout },
		)
		.json();
};
