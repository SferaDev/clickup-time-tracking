import { stringReplacer } from "../../utils/string";
import { FetchHttpClient } from "../http/FetchHttpClient";
import { HttpClient } from "../http/HttpClient";

export class ClickupClient {
    private client: HttpClient;

    constructor(apiKey?: string, options: ApiOptions = {}) {
        const { apiVersion = 2 } = options;
        if (apiVersion !== 2) throw new Error(`Invalid API version: ${apiVersion}`);

        this.client = new FetchHttpClient({
            baseUrl: `https://api.clickup.com/api/v${apiVersion}/`,
            headers: {
                Authorization: apiKey ?? "",
            },
        });
    }

    public get timeTracking() {
        return {
            list: this.buildEndpoint("get", "team/{{team}}/time_entries"),
        };
    }

    public async request<T extends keyof ApiEndpoints>(
        method: ApiEndpoints[T]["method"],
        url: T,
        params?: ApiEndpoints[T]["params"]
    ): Promise<ApiEndpoints[T]["response"]> {
        const { data } = await this.client
            .request<ApiResponse<ApiEndpoints[T]["response"]>>({
                method,
                url: stringReplacer(url, params),
                params,
            })
            .getData();

        return data;
    }

    private buildEndpoint<T extends keyof ApiEndpoints>(method: ApiEndpoints[T]["method"], url: T) {
        return (requestParams?: Omit<ApiEndpoints[T]["params"], "api_token">) =>
            this.request(method, url, requestParams);
    }
}

interface ApiOptions {
    apiVersion?: number;
}

interface ApiResponse<T> {
    data: T;
}

interface ApiEndpoints {
    "team/{{team}}/time_entries": {
        method: "get";
        params: { team: number; start_date?: number; end_date?: number; assignee?: number[] };
        response: Array<{
            id: string;
            task: {
                id: string;
                custom_id: string;
                name: string;
                status: {
                    status: string;
                    color: string;
                    type: string;
                    orderindex: number;
                };
            };
            wid: string;
            user: {
                id: 1;
                username: string;
                email: string;
                color: string;
                initials: string;
                profilePicture: string;
            };
            billable: boolean;
            start: string; // ms time
            end: string; // ms time
            duration: string;
            description: string;
            tags: string[];
            source: string;
            at: string; // ms time
        }>;
    };
}
