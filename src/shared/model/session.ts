import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { createGStore } from "create-gstore";
import { publicFetchCluent } from "../api/instance";

const TOKEN_KEY = "token";

let refreshTokenPromise: Promise<string | null> | null = null;

type Session = {
	email: string;
	userId: string;
	exp: number;
	iat: number;
};

export const useSession = createGStore(() => {
	const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

	const login = (token: string) => {
		localStorage.setItem(TOKEN_KEY, token);
		setToken(token);
	};

	const logout = () => {
		localStorage.removeItem(TOKEN_KEY);
		setToken(null);
	};

	const session = token ? jwtDecode<Session>(token) : null;

	const refreshToken = async () => {
		if (!token) {
			return null;
		}

		const session = jwtDecode<Session>(token);

		if (session.exp < Date.now() / 1000) {
			if (!refreshTokenPromise) {
				refreshTokenPromise = publicFetchCluent
					.POST("/auth/refresh")
					.then((res) => res.data?.accessToken ?? null)
					.then((newToken) => {
						if (newToken) {
							login(newToken);
							return newToken;
						} else {
							logout();
							return null;
						}
					})
					.finally(() => {
						refreshTokenPromise = null;
					});
			}

			const newToken = await refreshTokenPromise;

			if (newToken) {
				return newToken;
			} else {
				return null;
			}
		}

		return token;
	};

	return { login, logout, session, refreshToken };
});
