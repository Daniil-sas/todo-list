import { StatusLabel } from "../const.js";
import AbstractComponent from "../framework/view/abstract-component.js";

function createTasksListTemplate(label, status) {
    return (
        `<div class="display-tasks ${status}">
          <h3>${label}</h3>
          <ul class="task-container">
          </ul>
        </div>`
    );
}

export default class TasksListComponent extends AbstractComponent {
    constructor(status) {
        super();
        this.status = status;
    }

    get template() {
        const label = StatusLabel[this.status];
        return createTasksListTemplate(label, this.status);
    }
}