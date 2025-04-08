import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://dragonball-api.com/api",
});
const cachedApi = setupCache(api, {
    ttl: 15 * 60 * 1000,
});
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://dragonball-api.com/api";
export const fetchCharacters = async (search, page = 1, filters) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
            throw new Error("API authentication required");
        }
        const params = new URLSearchParams({
            page: page.toString(),
            limit: "10",
            ...(search && { name: search }),
            ...filters,
        });
        const response = await cachedApi.get("/characters", {
            params: {
                page,
                limit: 10,
                ...(search && { name: search }),
            },
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Accept-Version": "1.0.0",
            },
        });
        let responseData;
        if (Array.isArray(response.data)) {
            responseData = {
                characters: response.data,
                meta: {
                    totalItems: response.data.length,
                    itemCount: response.data.length,
                    itemsPerPage: 10,
                    totalPages: Math.ceil(response.data.length / 10),
                    currentPage: 1,
                },
                links: {
                    first: `${API_BASE}/characters?limit=10`,
                    previous: "",
                    next: "",
                    last: "",
                },
            };
        }
        else {
            responseData = response.data;
            responseData.characters =
                responseData.characters || responseData.items || [];
        }
        if (!responseData.characters?.length) {
            throw new Error(responseData.error || "No characters found");
        }
        return {
            characters: response.data.items || [],
            pagination: {
                totalPages: Math.ceil(response.data.items.length / 10),
                currentPage: page,
                links: responseData.links || {
                    first: "",
                    previous: "",
                    next: "",
                    last: "",
                },
            },
        };
    }
    catch (error) {
        const errorDetails = {
            message: "Unknown error",
            status: 500,
            url: `${API_BASE}/characters`,
            error: axios.isAxiosError(error) ? error.response?.data : error,
            params: {},
            stack: "",
        };
        if (axios.isAxiosError(error)) {
            errorDetails.message = error.response?.data?.error || error.message;
            errorDetails.status = error.response?.status || 500;
            errorDetails.url = error.config?.url || errorDetails.url;
            errorDetails.params = error.config?.params || {};
            errorDetails.stack = error.stack || "";
        }
        else if (error instanceof Error) {
            errorDetails.message = error.message;
        }
        console.error("API Error Details:", errorDetails);
        throw new Error(`Failed to load characters: ${errorDetails.message}`);
    }
};
export const fetchCharacterDetails = async (id) => {
    try {
        const response = await cachedApi.get(`${API_BASE}/characters/${id}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Character details error:", {
            error: axios.isAxiosError(error) ? error.toJSON() : error,
        });
        throw new Error("Failed to fetch character details");
    }
};
