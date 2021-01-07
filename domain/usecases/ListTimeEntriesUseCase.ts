import { fromPairs, uniq } from "lodash";
import { ClickupClient } from "../../data/clients/clickup/ClickupClient";
import { promiseMap } from "../../data/utils/promises";
import { UseCase } from "../CompositionRoot";
import { TimeEntry } from "../entities/TimeEntry";

export class ListTimeEntriesUseCase implements UseCase {
    public async execute(token: string, team: number): Promise<TimeEntry[]> {
        const client = new ClickupClient(token);
        const { data: entries } = await client.timeTracking.list({ team });
        const taskIds = entries.map(({ task }) => task.id);
        const projectsByTask = await this.getTaskProjects(client, taskIds);

        return entries.map(
            ({ id, task, user, start, end, duration, description, billable, tags }) => ({
                id,
                description,
                startTime: start,
                endTime: end,
                duration,
                user: { id: user.id, name: user.username, avatar: user.profilePicture },
                task: { id: task.id, name: task.name },
                project: projectsByTask[task.id] ?? { id: "", name: "" },
                billable,
                tags,
            })
        );
    }

    private async getTaskProjects(
        client: ClickupClient,
        taskIds: string[]
    ): Promise<Record<string, { id: string; name: string }>> {
        const tasks = await promiseMap(uniq(taskIds), async taskId => {
            const task = await client.tasks.get({ task: taskId });
            return [taskId, { id: task.project.id, name: task.project.name }];
        });

        return fromPairs(tasks);
    }
}
