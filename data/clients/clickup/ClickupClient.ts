import { FetchHttpClient } from "../http/FetchHttpClient";
import { HttpClient } from "../http/HttpClient";
import { getTime } from "date-fns";

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

    public async listTimeEntries(
        team: number,
        startDate?: Date,
        endDate?: Date,
        assignee?: number[]
    ) {
        const { data } = await this.client
            .request<{
                data: Array<{
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
            }>({
                method: "get",
                url: `/team/${team}/time_entries`,
                params: {
                    start_date: startDate ? getTime(startDate) : undefined,
                    end_date: endDate ? getTime(endDate) : undefined,
                    assignee,
                },
            })
            .getData();

        return data.map(({ start, end, at, ...rest }) => ({
            ...rest,
            start: new Date(start),
            end: new Date(end),
            at: new Date(at),
        }));
    }
}

interface ApiOptions {
    apiVersion?: number;
}
