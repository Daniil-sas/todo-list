import { render, RenderPosition } from './framework/render.js'
import HeaderComponent from './view/header.js'
import AddNewTaskComponent from './view/task-form.js'
import DeskComponent from './view/task-board.js'
import TasksListComponent from './view/task-list.js'
import TaskComponent from './view/task.js'

const bodyContainer = document.querySelector('.page-body');
const addTaskContainer = document.querySelector('.add-new-task-component');
const deskContainer = document.querySelector('.main-content');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddNewTaskComponent(), addTaskContainer);
render(new DeskComponent(), deskContainer);

const taskListContainer = document.querySelector('.desk-tasks');

for (let i = 0; i < 4; i++) {
    const list = new TasksListComponent();

    render(list, taskListContainer);
    
    const taskContainer = list.getElement().querySelector(".task-container");

    for (let j = 0; j < 3; j++) {
        render(new TaskComponent(), taskContainer);
    }
}
