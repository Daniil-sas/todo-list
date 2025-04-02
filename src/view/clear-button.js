import BaseComponent from "../framework/base-component.js";
import { render } from "../framework/render.js";

function createClearButtonTemplate() {
    return (
        `
        <button class="clear-button">Очистить</button>
        `
    )
}

export default class ClearButtonComonent extends BaseComponent {
    getTemplate() {
        return createClearButtonTemplate();
    }
}