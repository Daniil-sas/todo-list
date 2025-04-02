import { render } from "../framework/render.js";
import TaskComponent from "../view/task.js";
import DeskComponent from "../view/task-board.js";
import TasksListComponent from "../view/task-list.js";
import ClearButtonComonent from "../view/clear-button.js";

export default class TasksBoardPresenter {
    #taskDeskComponent = new DeskComponent();
    #boardContainer = null;
    #boardtasks = [];

    #tasksModel = null;

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardtasks = [...this.#tasksModel.getTasks()];

        render(this.#taskDeskComponent, this.#boardContainer);
        
        for (const taskList of this.#boardtasks) {
            const status = taskList.status;

            const list = new TasksListComponent(status);

            render(list, this.#taskDeskComponent.getElement());
        
            for (const task of taskList.tasks) {
                render(new TaskComponent(task), list.getElement().querySelector('.task-container'));
            }
        }

        const basketContainer = document.querySelector('.basket');

        if (basketContainer) {
            render(new ClearButtonComonent(), basketContainer);
        }
    }
}