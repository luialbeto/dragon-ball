import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const api = axios.create();
const cachedApi = setupCache(api, {
  ttl: 24 * 60 * 60 * 1000,
  methods: ["get"],
});

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
export interface DragonBallCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: "Male" | "Female" | "Unknown";
  description: string;
  image: string;
  affiliation: string;
  originPlanet?: {
    id: number;
    name: string;
    isDestroyed: boolean;
    description: string;
    image: string;
  };
  transformations: Transformation[];
}

interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

interface ApiResponse<T> {
  characters?: T[];
  items?: T[];
  meta?: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links?: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
  error?: string;
}

export const fetchCharacters = async (
  search?: string,
  page = 1,
  filters?: {
    race?: string;
    gender?: string;
    affiliation?: string;
  }
) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      throw new Error(
        "API authentication failed. Please check your configuration."
      );
    }

    const params = {
      page: page.toString(),
      limit: "10",
      ...(search && { name: search }),
      ...Object.entries(filters || {}).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>),
    };

    const response = await cachedApi.get(`${API_BASE}/characters`, {
      params,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Accept-Version": "1.0.0",
      },
    });

    let responseData: ApiResponse<DragonBallCharacter>;
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
    } else {
      responseData = response.data;
      responseData.characters =
        responseData.characters || responseData.items || [];
    }

    if (!responseData.characters?.length) {
      throw new Error(responseData.error || "No characters found");
    }

    return {
      characters: responseData.characters,
      pagination: {
        totalPages: responseData.meta?.totalPages || 1,
        currentPage: responseData.meta?.currentPage || page,
        links: responseData.links || {
          first: "",
          previous: "",
          next: "",
          last: "",
        },
      },
    };
  } catch (error) {
    const errorDetails = {
      message: "Unknown error",
      status: 500,
      url: `${API_BASE}/characters`,
      params: {},
      stack: "",
    };

    if (axios.isAxiosError(error)) {
      errorDetails.message = error.response?.data?.error || error.message;
      errorDetails.status = error.response?.status || 500;
      errorDetails.url = error.config?.url || errorDetails.url;
      errorDetails.params = error.config?.params || {};
      errorDetails.stack = error.stack || "";
    } else if (error instanceof Error) {
      errorDetails.message = error.message;
    }

    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to load characters: ${errorDetails.message}`);
  }
};

export const fetchCharacterDetails = async (id: number) => {
  try {
    const response = await cachedApi.get<DragonBallCharacter>(
      `${API_BASE}/characters/${id}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Character details error:", {
      error: axios.isAxiosError(error) ? error.toJSON() : error,
    });
    throw new Error("Failed to fetch character details");
  }
};
