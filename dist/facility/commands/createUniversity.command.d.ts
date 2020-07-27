import { Command } from './command';
declare class University {
    readonly address: any;
}
export declare class CreateUniversityCommand extends Command {
    readonly data: University;
}
export {};
