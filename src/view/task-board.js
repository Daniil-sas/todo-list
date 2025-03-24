import { createElement } from "../framework/render.js"

function createDeskTemplate() {
    return (
        `<section class="desk-tasks">
        </section>`
    );
}

export default class DeskComponent {
    getTemplate() {
        return createDeskTemplate();
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