import { createElement } from "../framework/render.js"

function createTasksListTemplate() {
    return (
        `<div class="display-tasks">
          <h3>Название блока</h3>
          <ul class="task-container">
          </ul>
        </div>`
    );
}

export default class TasksListComponent {
    getTemplate() {
        return createTasksListTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}