import AbstractComponent from "../framework/view/abstract-component.js";

function createClearButtonTemplate() {
    return (
        `
        <button class="clear-button">Очистить</button>
        `
    )
}

export default class ClearButtonComonent extends AbstractComponent {
    get template() {
        return createClearButtonTemplate();
    }
}