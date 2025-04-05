import { render, RenderPosition } from './framework/render.js'
import HeaderComponent from './view/header-component.js'
import AddNewTaskComponent from './view/task-form-component.js'
import TasksBoardPresenter from './presenter/tasks-board-presenter.js'
import TasksModel from './model/task-model.js'

const bodyContainer = document.querySelector('.page-body');
const addTaskContainer = document.querySelector('.add-new-task-component');
const deskContainer = document.querySelector('.main-content');

const tasks = new TasksModel();
const taskBoardPresenter = new TasksBoardPresenter({
    boardContainer: deskContainer,
    tasksModel: tasks,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddNewTaskComponent(), addTaskContainer);

taskBoardPresenter.init();