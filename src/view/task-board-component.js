import AbstractComponent from "../framework/view/abstract-component.js"

function createDeskTemplate() {
    return (
        `<section class="desk-tasks">
        </section>`
    );
}

export default class DeskComponent extends AbstractComponent {
    get template() {
        return createDeskTemplate();
    }
}