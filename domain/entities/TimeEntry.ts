export interface TimeEntry {
    id: string;
    description: string;
    startTime: string;
    endTime: string;
    duration: string;
    user: {
        id: number;
        name: string;
        avatar: string;
    };
    task: {
        id: string;
        name: string;
    };
}
