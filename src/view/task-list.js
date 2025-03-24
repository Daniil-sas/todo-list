import BaseComponent from "../framework/base-component.js";

function createTasksListTemplate() {
    return (
        `<div class="display-tasks">
          <h3>Название блока</h3>
          <ul class="task-container">
          </ul>
        </div>`
    );
}

export default class TasksListComponent extends BaseComponent {
    getTemplate() {
        return createTasksListTemplate();
    }
}