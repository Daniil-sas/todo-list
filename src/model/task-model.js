import { tasks } from "../mock/taks.js";

export default class TasksModel {
    #boardtasks = tasks;

    get tasks() {
        return this.#boardtasks;
    }
}