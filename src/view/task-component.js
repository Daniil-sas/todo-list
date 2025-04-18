import AbstractComponent from "../framework/view/abstract-component.js";

function createTaskTemplate(id, task) {
    return (
        `<li id=${id}>${task}</li>`
    );
}

export default class TaskComponent extends AbstractComponent {
    constructor(task) {
        super();
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskTemplate(this.task.id, this.task.name);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);
        this.element.addEventListener('dragstart', (evt) => {
            evt.dataTransfer.setData('text/plain', this.task.id);
        });
    }
}