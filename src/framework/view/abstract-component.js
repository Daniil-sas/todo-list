import { createElement } from "../render.js"

export default class AbstractComponent {
    #element = null;
    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error("Нельзя создавать объект абстрактного класса!");
        }
    }

    get template() {
        throw new Error("У абстрактного класса не реализован метод: getTemplate");
    }

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template);
        }

        return this.#element;
    }

    removeElement() {
        this.#element = null;
    }
}