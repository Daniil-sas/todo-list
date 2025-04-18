import { render } from "../framework/render.js";
import TaskComponent from "../view/task-component.js";
import DeskComponent from "../view/task-board-component.js";
import TasksListComponent from "../view/task-list-component.js";
import StubComponent from "../view/stub-component.js";

export default class TasksBoardPresenter {
    #taskDeskComponent = new DeskComponent();
    #clearButtonComponent = null;
    #boardContainer = null;
    #boardtasks = [];
    #tasksModel = null;

    constructor({boardContainer, tasksModel, clearButtonComponent}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#clearButtonComponent = clearButtonComponent;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderBoard();
    }

    #renderBoard() {
        if (this.#tasksModel.tasks.length != this.#boardtasks.length) {
            this.#boardtasks = [...this.#tasksModel.tasks];
        }

        render(this.#taskDeskComponent, this.#boardContainer);

        this.#boardtasks.forEach((taskList) => {
            this.#renderTaskList(taskList.status, taskList.tasks);
        });

        this.#renderClearButton();
    }

    createTask() {
        const taskTitle = document.querySelector('.add-new').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.add-new').value = '';
    }

    clearBasket() {
        this.#tasksModel.removeBasketTask();
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status, this.#handleTaskDrop.bind(this));

        render(list, this.#taskDeskComponent.element);

        tasks.length === 0 ? this.#renderStubComponent(list) : tasks.forEach((task) => {
            this.#renderTask(task, list);
        });
    }

    #renderTask(task, container) {
        render(new TaskComponent(task), container.element.querySelector('ul'));
    }

    #renderClearButton() {
        const basketContainer = document.querySelector('.basket');

        const basketTasks = basketContainer?.querySelector('li');

        if (basketContainer && basketTasks) {
            render(this.#clearButtonComponent, basketContainer);
        }
    }

    #renderStubComponent(container) {
        render(new StubComponent(), container.element);
    }

    #clearBoard() {
        this.#taskDeskComponent.element.innerHTML = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #handleTaskDrop(taskId, newStatus) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus);
    }
}