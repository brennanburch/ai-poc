import _ky from "ky";
import { serialize as formData } from "object-to-formdata";

const ky = _ky.extend({
	headers: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Authorization: `Basic ${btoa(":lxis3000")}`,
	},
});

/** 10min in ms */
const timeout = 600_000;

type SessionId = {
	sessionId: string;
};

export const getNewSessionId = async (): Promise<SessionId> => (
	ky.get("https://ai-poc-server.onrender.com/docs/start-session").json()
);

type QuestionInput = {
	question: string;
	sessionId: string;
};

export type Context = {
	fileId: string;
	name: string;
	content: string;
};

export type Answer = {
	answer: string;
	context: Context[];
};

export const submitQuestion = async ({ question, sessionId }: QuestionInput): Promise<Answer> => (ky
	.post(
		"https://ai-poc-server.onrender.com/docs/chat",
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
};

export const uploadFiles = async ({ file, sessionId }: UploadInput): Promise<UploadResponse> => (ky
	.post(
		"https://ai-poc-server.onrender.com/docs/upload",
		{ body: formData({ file, sessionId }), timeout },
	)
	.json()
);
