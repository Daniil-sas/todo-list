import BaseComponent from '../framework/base-component.js';

function createHeaderComponentTemplate() {
    return (
        `<header>
          <h1>Список задач</h1>
        </header>`
    );
}

export default class HeaderComponent extends BaseComponent {
    getTemplate() {
        return createHeaderComponentTemplate();
    }
}