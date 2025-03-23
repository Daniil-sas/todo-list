import HeaderComponent from './view/header-component.js'
import AddNewTaskComponent from './view/add-new-task.js'
import { render, RenderPosition } from './framework/render.js'

const bodyContainer = document.querySelector('.header-component');
const addTaskContainer = document.querySelector('.add-new-task-component');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddNewTaskComponent(), addTaskContainer);
