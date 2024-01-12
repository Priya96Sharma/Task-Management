export interface Task {
    id?: number;
    title: string;
    description: string;
    status: any;
}
export class TaskUpdates {
    constructor(
        public id = 0,
        public title = '',
        public description = '',
        public status = ''
    ) { }
    clone() {
        return new TaskUpdates(
            this.id,
            this.title,
            this.description,
            this.status
        );
    }
}