import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { CONFIG } from "@/shared/model/config";
import type { ApiPaths, ApiSchemas } from "./schema";
import { useSession } from "../model/session";

export const fetchCluent = createFetchClient<ApiPaths>({
	baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchCluent);

export const publicFetchCluent = createFetchClient<ApiPaths>({
	baseUrl: CONFIG.API_BASE_URL,
});

export const publicRqClient = createClient(publicFetchCluent);

fetchCluent.use({
	async onRequest({ request }) {
		const token = await useSession.getState().refreshToken();

		if (token) {
			request.headers.set("Authorization", `Bearer ${token}`);
		} else {
			return new Response(
				JSON.stringify({
					code: "NOT_AUTHORIZED",
					message: "User is not authorized",
				} as ApiSchemas["Error"]),
				{ status: 401, headers: { "Content-Type": "application/json" } }
			);
		}
	},
});
