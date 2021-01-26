import { ClickupClient } from "../../data/clients/clickup/ClickupClient";
import { UseCase } from "../CompositionRoot";
import { TimeEntry } from "../entities/TimeEntry";

export class ListTimeEntriesUseCase implements UseCase {
    public async execute(token: string, team: number): Promise<TimeEntry[]> {
        const client = new ClickupClient(token);
        const { data: entries } = await client.timeTracking.list({ team });

        return entries.map(
            ({ id, task, user, start, end, duration, description, billable, tags }) => ({
                id,
                description,
                startTime: start,
                endTime: end,
                duration,
                user: { id: user.id, name: user.username, avatar: user.profilePicture },
                task: { id: task.id, name: task.name },
                project: { id: "", name: "" }, // TODO: Disabled for now
                billable,
                tags,
            })
        );
    }

    private async getTaskProjects(
        _client: ClickupClient,
        _team: number
    ): Promise<Record<string, { id: string; name: string }>> {
        /** Approach 1
        
        const tasks = await promiseMap(uniq(taskIds), async taskId => {
            const task = await client.tasks.get({ task: taskId });
            return [taskId, { id: task.project.id, name: task.project.name }];
        });

        return fromPairs(tasks);
        **/

        /** Approach 2
        
        const { spaces } = await client.spaces.list({ team, archived: false });
        const folders = await promiseMap(spaces, async ({ id }) => {
            const { folders } = await client.folders.list({ space: parseInt(id), archived: false });
            return folders;
        });

        const lists = await promiseMap(_.flatten(folders), async ({ id }) => {
            const { lists } = await client.lists.list({ folder: parseInt(id), archived: false });
            return lists;
        });

        const tasks = await promiseMap(_.flatten(lists), async ({ id }) => {
            const { tasks } = await client.tasks.list({ list: parseInt(id), archived: false });
            return tasks;
        });

        return _(tasks)
            .flatten()
            .map(({ id, project }) => [id, { id: project.id, name: project.name }])
            .fromPairs().value();
        **/

        return {};
    }
}
