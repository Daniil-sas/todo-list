import AbstractComponent from "../framework/view/abstract-component.js";

function createStubComponent() {
    return (
        `
        <div class=stub>
            Перетащите карточку
        </div>
        `
    );
}

export default class StubComponent extends AbstractComponent {
    get template() {
        return createStubComponent();
    }
}