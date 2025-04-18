import { StatusLabel } from "../const.js";
import AbstractComponent from "../framework/view/abstract-component.js";

function createTasksListTemplate(label, status) {
    return (
        `<div class="display-tasks ${status}">
          <h3>${label}</h3>
          <ul>
          </ul>
        </div>`
    );
}

export default class TasksListComponent extends AbstractComponent {
    #droppedTaskId = null;

    constructor(status, onTaskDrop) {
        super();
        this.status = status;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        const label = StatusLabel[this.status];
        return createTasksListTemplate(label, this.status);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (evt) => {
            evt.preventDefault();
        });

        container.addEventListener('dragenter', (evt) => {
            evt.preventDefault();
            this.#droppedTaskId = evt.target.id;
        });

        container.addEventListener('drop', (evt) => {
            evt.preventDefault();
            const taskId = evt.dataTransfer.getData('text/plain');
            console.log(taskId, this.#droppedTaskId);
            onTaskDrop(taskId, this.status);
        });
    }
}