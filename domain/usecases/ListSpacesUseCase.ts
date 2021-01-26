import _ from "lodash";
import { ListItem } from "../../components/project-picker/ProjectPicker";
import { ClickupClient } from "../../data/clients/clickup/ClickupClient";
import { promiseMap } from "../../data/utils/promises";
import { UseCase } from "../CompositionRoot";
import { Space } from "../entities/Space";

export class ListSpacesUseCase implements UseCase {
    public async execute(token: string, team: number): Promise<Space[]> {
        const client = new ClickupClient(token);
        const { spaces } = await client.spaces.list({ team, archived: false });
        const result = await promiseMap(spaces, async ({ id, name }) => {
            const { folders } = await client.folders.list({ space: parseInt(id), archived: false });
            return {
                id,
                name,
                folders: folders.map(({ id, name, lists }) => ({
                    id,
                    name,
                    lists: lists.map(({ id, name }) => ({ id, name })),
                })),
            };
        });

        return result;
    }
}
