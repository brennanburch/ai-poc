import _ky from "ky";
import { serialize as formData } from "object-to-formdata";

const localUrl = "http://localhost:3000";
const prodUrl = "https://ai-poc-server.onrender.com";

const ky = _ky.extend({
	prefixUrl: prodUrl,
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
	ky.get("docs/start-session").json()
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
		"docs/chat",
		{ json: { message: question, sessionId }, timeout },
	)
	.json()
);

type QuestionForDocsInput = {
	question: string;
	documents: string[];
};

export const submitQuestionForDocs = async ({ question, documents }: QuestionForDocsInput): Promise<Answer> => (ky
	.post(
		"docs/chat-curated",
		{ json: { message: question, documents }, timeout },
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
	summary: string;
};

export const uploadFiles = async ({ file, sessionId }: UploadInput): Promise<UploadResponse> => (ky
	.post(
		"docs/upload",
		{ body: formData({ file, sessionId }), timeout },
	)
	.json()
);
