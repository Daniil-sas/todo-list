import { tasks } from "../mock/taks.js";

export default class TasksModel {
    #boardtasks = tasks;

    getTasks() {
        return this.#boardtasks;
    }
}