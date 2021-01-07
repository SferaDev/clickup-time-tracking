import { ClickupClient } from "../../data/clients/clickup/ClickupClient";
import { UseCase } from "../CompositionRoot";
import { TimeEntry } from "../entities/TimeEntry";

export class ListTimeEntries implements UseCase {
    public async execute(token: string, team: number): Promise<TimeEntry[]> {
        const client = new ClickupClient(token);
        const data = await client.timeTracking.list({ team });
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
