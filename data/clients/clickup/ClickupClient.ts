import { cache } from "../../utils/cache";
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

    public get tasks() {
        return {
            get: this.buildEndpoint("get", "task/{{task}}"),
            list: this.buildEndpoint("get", "list/{{list}}/task"),
        };
    }

    public get spaces() {
        return {
            list: this.buildEndpoint("get", "team/{{team}}/space"),
        };
    }

    public get folders() {
        return {
            list: this.buildEndpoint("get", "space/{{space}}/folder"),
        };
    }

    public get lists() {
        return {
            list: this.buildEndpoint("get", "folder/{{folder}}/list"),
        };
    }

    @cache()
    public async request<T extends keyof ApiEndpoints>(
        method: ApiEndpoints[T]["method"],
        url: T,
        params?: ApiEndpoints[T]["params"]
    ): Promise<ApiEndpoints[T]["response"]> {
        const data = await this.client
            .request<ApiEndpoints[T]["response"]>({
                method,
                url: stringReplacer(url, params),
                params,
            })
            .getData();

        return data;
    }

    private buildEndpoint<T extends keyof ApiEndpoints>(method: ApiEndpoints[T]["method"], url: T) {
        return (requestParams?: ApiEndpoints[T]["params"]) =>
            this.request(method, url, requestParams);
    }
}

interface ApiOptions {
    apiVersion?: number;
}

interface ApiEndpoints {
    "team/{{team}}/time_entries": {
        method: "get";
        params: { team: number; start_date?: number; end_date?: number; assignee?: number[] };
        response: {
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
        };
    };
    "task/{{task}}": {
        method: "get";
        params: { task: string };
        response: {
            id: string;
            custom_id: string | null;
            name: string;
            text_content: string;
            description: string;
            status: {
                status: string;
                color: string;
                orderindex: number;
                type: string;
            };
            orderindex: string;
            date_created: string; // ms time
            date_updated: string; // ms time
            date_closed: string | null;
            archived: boolean;
            creator: {
                id: number;
                username: string;
                color: string;
                email: string;
                profilePicture: string | null;
            };
            assignees: Array<{
                id: number;
                username: string;
                color: string;
                email: string;
                profilePicture: string | null;
                initials: string;
            }>;
            watchers: Array<{
                id: number;
                username: string;
                color: string;
                email: string;
                profilePicture: string | null;
                initials: string;
            }>;
            checklists: string[];
            tags: string[];
            parent: string | null;
            priority: string | null;
            due_date: string | null;
            start_date: string | null;
            points: string | null;
            time_estimate: number | null; // unknown
            time_spent: number | null;
            dependencies: string[];
            linked_tasks: string[];
            team_id: string;
            url: string;
            permission_level: string;
            list: {
                id: string;
                name: string;
                access: boolean;
            };
            project: {
                id: string;
                name: string;
                hidden: boolean;
                access: boolean;
            };
            folder: {
                id: string;
                name: string;
                hidden: boolean;
                access: boolean;
            };
            space: {
                id: string;
            };
            attachments: string[];
        };
    };
    "team/{{team}}/space": {
        method: "get";
        params: { team: number; archived: boolean };
        response: {
            spaces: Array<{
                id: string;
                name: string;
                private: boolean;
                statuses: Array<{
                    id: string;
                    status: string;
                    type: string;
                    orderindex: number;
                    color: string;
                }>;
                multiple_assignees: boolean;
                features: {
                    due_dates: {
                        enabled: boolean;
                        start_date: boolean;
                        remap_due_dates: boolean;
                        remap_closed_due_date: boolean;
                    };
                    sprints: {
                        enabled: boolean;
                    };
                    time_tracking: {
                        enabled: boolean;
                        harvest: boolean;
                        rollup: boolean;
                    };
                    points: {
                        enabled: boolean;
                    };
                    priorities: {
                        enabled: boolean;
                        priorities: Array<{
                            id: string;
                            priority: string;
                            color: string;
                            orderindex: string;
                        }>;
                    };
                    tags: {
                        enabled: boolean;
                    };
                    time_estimates: {
                        enabled: boolean;
                        rollup: boolean;
                        per_assignee: boolean;
                    };
                    check_unresolved: {
                        enabled: boolean;
                        subtasks: boolean;
                        checklists: {};
                        comments: {};
                    };
                    zoom: {
                        enabled: boolean;
                    };
                    milestones: {
                        enabled: boolean;
                    };
                    custom_fields: {
                        enabled: boolean;
                    };
                    remap_dependencies: {
                        enabled: boolean;
                    };
                    dependency_warning: {
                        enabled: boolean;
                    };
                    multiple_assignees: {
                        enabled: boolean;
                    };
                };
                archived: boolean;
                members: Array<{
                    user: {
                        id: number;
                        username: string;
                        color: string;
                        profilePicture: {};
                        initials: string;
                    };
                }>;
            }>;
        };
    };
    "space/{{space}}/folder": {
        method: "get";
        params: { space: number; archived: boolean };
        response: {
            folders: Array<{
                id: string;
                name: string;
                orderindex: number;
                override_statuses: boolean;
                hidden: boolean;
                space: {
                    id: string;
                    name: string;
                };
                task_count: string;
                archived: boolean;
                statuses: Array<{
                    id: string;
                    status: string;
                    type: string;
                    orderindex: number;
                    color: string;
                }>;
                lists: Array<{
                    id: string;
                    name: string;
                    orderindex: number;
                    status: {};
                    priority: {};
                    assignee: {};
                    task_count: string;
                    due_date: {};
                    start_date: {};
                    space: {
                        id: string;
                        name: string;
                        access: boolean;
                    };
                    archived: boolean;
                    override_statuses: boolean;
                    statuses: Array<{
                        id: string;
                        status: string;
                        type: string;
                        orderindex: number;
                        color: string;
                    }>;
                    permission_level: string;
                }>;
                permission_level: string;
            }>;
        };
    };
    "folder/{{folder}}/list": {
        method: "get";
        params: { folder: number; archived: boolean };
        response: {
            lists: Array<{
                id: string;
                name: string;
                orderindex: number;
                status: null;
                priority: null;
                assignee: null;
                task_count: string;
                due_date: null;
                start_date: null;
                folder: {
                    id: string;
                    name: string;
                    hidden: boolean;
                    access: boolean;
                };
                space: {
                    id: string;
                    name: string;
                    access: boolean;
                };
                archived: boolean;
                override_statuses: boolean;
                permission_level: string;
            }>;
        };
    };
    "list/{{list}}/task": {
        method: "get";
        params: { list: number; archived: boolean };
        response: {
            tasks: Array<{
                id: string;
                custom_id: null;
                name: string;
                text_content: null;
                description: null;
                status: {
                    status: string;
                    color: string;
                    type: string;
                    orderindex: number;
                };
                orderindex: string;
                date_created: string;
                date_updated: string;
                date_closed: null;
                archived: boolean;
                creator: {
                    id: number;
                    username: string;
                    color: string;
                    email: string;
                    profilePicture: null;
                };
                assignees: [];
                watchers: [];
                checklists: [];
                tags: [];
                parent: null;
                priority: null;
                due_date: null;
                start_date: null;
                points: null;
                time_estimate: number;
                custom_fields: [];
                dependencies: [];
                linked_tasks: [];
                team_id: string;
                url: string;
                permission_level: string;
                list: {
                    id: string;
                    name: string;
                    access: boolean;
                };
                project: {
                    id: string;
                    name: string;
                    hidden: boolean;
                    access: boolean;
                };
                folder: {
                    id: string;
                    name: string;
                    hidden: boolean;
                    access: boolean;
                };
                space: {
                    id: string;
                };
            }>;
        };
    };
}
