export interface Space {
    id: string;
    name: string;
    folders: Array<{
        id: string;
        name: string;
        lists: Array<{
            id: string;
            name: string;
        }>;
    }>;
}
