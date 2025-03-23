import { createElement } from '../framework/render.js'

function createAddNewTaskTemplate() {
    return (
        `<form class=add-new-task>
            <h1>Новая задача</h1>
            <div class="bottom-group">
                <input placeholder="Название задачи..." type="text">
                <button>十 Добавить</button>
            </div>
        </form>`
    );
}

export default class AddNewTaskComponent {
    getTemplate() {
        return createAddNewTaskTemplate();
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