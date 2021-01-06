import { ClickupClient } from "../../data/clients/clickup/ClickupClient";
import { TimeEntry } from "../entities/TimeEntry";

export class ListTimeEntries {
    public async execute(token: string, team: number): Promise<TimeEntry[]> {
        const client = new ClickupClient(token);
        const data = await client.listTimeEntries(team);
        return data.map(({ id, task, user, start, end, duration, description }) => ({
            id,
            description,
            startTime: start,
            endTime: end,
            duration,
            user: { id: user.id, name: user.username, avatar: user.profilePicture },
            task: { id: task.id, name: task.name },
        }));
    }
}
