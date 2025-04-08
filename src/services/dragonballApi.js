var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
var api = axios.create();
var cachedApi = setupCache(api, {
    ttl: 24 * 60 * 60 * 1000,
    methods: ["get"],
});
var API_BASE = "/api";
export var fetchCharacters = function (search_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([search_1], args_1, true), void 0, function (search, page, filters) {
        var params, searchParams, response, responseData, error_1, errorDetails;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (page === void 0) { page = 1; }
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 2, , 3]);
                    if (!import.meta.env.VITE_API_KEY) {
                        throw new Error("API key is missing in environment variables");
                    }
                    params = __assign(__assign({ page: page.toString(), limit: "10" }, (search && { name: search })), Object.entries(filters || {}).reduce(function (acc, _a) {
                        var key = _a[0], value = _a[1];
                        if (value)
                            acc[key] = value;
                        return acc;
                    }, {}));
                    searchParams = new URLSearchParams(params);
                    return [4 /*yield*/, cachedApi.get("".concat(API_BASE, "/characters"), {
                            params: searchParams,
                            headers: {
                                Authorization: "Bearer ".concat(import.meta.env.VITE_API_KEY),
                                "Accept-Version": "1.0.0",
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _j.sent();
                    responseData = void 0;
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
                                first: "".concat(API_BASE, "/characters?limit=10"),
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
                    if (!((_a = responseData.characters) === null || _a === void 0 ? void 0 : _a.length)) {
                        throw new Error(responseData.error || "No characters found");
                    }
                    return [2 /*return*/, {
                            characters: responseData.characters,
                            pagination: {
                                totalPages: ((_b = responseData.meta) === null || _b === void 0 ? void 0 : _b.totalPages) || 1,
                                currentPage: ((_c = responseData.meta) === null || _c === void 0 ? void 0 : _c.currentPage) || page,
                                links: responseData.links || {
                                    first: "",
                                    previous: "",
                                    next: "",
                                    last: "",
                                },
                            },
                        }];
                case 2:
                    error_1 = _j.sent();
                    errorDetails = {
                        message: "Unknown error",
                        status: 500,
                        url: "".concat(API_BASE, "/characters"),
                        params: {},
                        stack: "",
                    };
                    if (axios.isAxiosError(error_1)) {
                        errorDetails.message = ((_e = (_d = error_1.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) || error_1.message;
                        errorDetails.status = ((_f = error_1.response) === null || _f === void 0 ? void 0 : _f.status) || 500;
                        errorDetails.url = ((_g = error_1.config) === null || _g === void 0 ? void 0 : _g.url) || errorDetails.url;
                        errorDetails.params = ((_h = error_1.config) === null || _h === void 0 ? void 0 : _h.params) || {};
                        errorDetails.stack = error_1.stack || "";
                    }
                    else if (error_1 instanceof Error) {
                        errorDetails.message = error_1.message;
                    }
                    console.error("API Error Details:", errorDetails);
                    throw new Error("Failed to load characters: ".concat(errorDetails.message));
                case 3: return [2 /*return*/];
            }
        });
    });
};
export var fetchCharacterDetails = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cachedApi.get("".concat(API_BASE, "/characters/").concat(id), {
                        headers: {
                            Authorization: "Bearer ".concat(import.meta.env.VITE_API_KEY),
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _a.sent();
                console.error("Character details error:", {
                    error: axios.isAxiosError(error_2) ? error_2.toJSON() : error_2,
                });
                throw new Error("Failed to fetch character details");
            case 3: return [2 /*return*/];
        }
    });
}); };
