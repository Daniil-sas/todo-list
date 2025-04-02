import { StatusLabel, Status } from "../const.js";
import BaseComponent from "../framework/base-component.js";

function createTasksListTemplate(label, status) {
    return (
        `<div class="display-tasks ${status}">
          <h3>${label}</h3>
          <ul class="task-container">
          </ul>
        </div>`
    );
}

export default class TasksListComponent extends BaseComponent {
    constructor(status) {
        super();
        this.status = status;
    }

    getTemplate() {
        const label = StatusLabel[this.status];
        return createTasksListTemplate(label, this.status);
    }
}