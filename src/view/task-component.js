import AbstractComponent from "../framework/view/abstract-component.js";

function createTaskTemplate(task) {
    return (
        `<li>${task}</li>`
    );
}

export default class TaskComponent extends AbstractComponent {
    constructor(tasks) {
        super();
        this.tasks = tasks;
    }

    get template() {
        return createTaskTemplate(this.tasks);
    }
}