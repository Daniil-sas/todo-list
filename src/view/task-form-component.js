import AbstractComponent from '../framework/view/abstract-component.js';

function createAddNewTaskTemplate() {
    return (
        `<form class=add-new-task>
            <h1>Новая задача</h1>
            <div class="bottom-group">
                <input placeholder="Название задачи..." type="text">
                <button>
                    <svg width="15" height="15" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10.0833" y="3.66663" width="1.83333" height="14.6667" fill="white" />
                        <rect x="18.3333" y="10.0833" width="1.83333" height="14.6667" transform="rotate(90 18.3333 10.0833)"
                        fill="white" />
                    </svg>
                    <span>Добавить</span>
                </button>
            </div>
        </form>`
    );
}

export default class AddNewTaskComponent extends AbstractComponent {
    get template() {
        return createAddNewTaskTemplate();
    }
}