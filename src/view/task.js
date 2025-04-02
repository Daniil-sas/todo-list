import BaseComponent from "../framework/base-component.js";

function createTaskTemplate(task) {
    return (
        `<li>${task}</li>`
    );
}

export default class TaskComponent extends BaseComponent {
    constructor(tasks) {
        super();
        this.tasks = tasks;
    }

    getTemplate() {
        return createTaskTemplate(this.tasks);
    }
}