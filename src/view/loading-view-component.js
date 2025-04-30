import AbstractComponent from "../framework/view/abstract-component.js";

function creatNoTaskTemplate() {
    return (
        `
        <p class=board-no-task>
            Loading...
        </p>
        `
    );
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return creatNoTaskTemplate();
    }
}