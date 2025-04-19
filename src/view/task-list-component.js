import { OrderPosition, StatusLabel } from "../const.js";
import AbstractComponent from "../framework/view/abstract-component.js";

function createTasksListTemplate(label, status) {
    return (
        `<div class="display-tasks ${status}">
          <h3>${label}</h3>
          <ul>
          </ul>
        </div>`
    );
}

export default class TasksListComponent extends AbstractComponent {
    constructor(status, onTaskDrop) {
        super();
        this.status = status;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        const label = StatusLabel[this.status];
        return createTasksListTemplate(label, this.status);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (evt) => {
            evt.preventDefault();
        });
        
        container.addEventListener('drop', (evt) => {
            evt.preventDefault();
            const droppedTarget = {
                taskId: null,
                order: OrderPosition.END
            };

            const dropTargetElement = evt;
            const [x, y] = [dropTargetElement.clientX, dropTargetElement.clientY];
            const localName = dropTargetElement.target.localName;
            
            if (localName === 'div' || localName === 'h3') {
                droppedTarget.order = document.elementFromPoint(x, y - 15).localName === 'li' ? OrderPosition.END : OrderPosition.START;
            } else if (localName === 'ul') {
                const aboveElement = document.elementFromPoint(x, y - 15).id;
                droppedTarget.taskId = aboveElement;
                droppedTarget.order = OrderPosition.BELOW;
            } else if (localName === 'li') {
                droppedTarget.taskId = dropTargetElement.target.id;
                const targetHeight = dropTargetElement.target.clientHeight;
                const targetOffsetTop = dropTargetElement.target.offsetTop;

                const dragPositionRelativeToTarget = y - targetOffsetTop;

                droppedTarget.order = dragPositionRelativeToTarget > targetHeight / 2 
                    ? OrderPosition.BELOW 
                    : OrderPosition.ABOVE;
            }

            const taskId = evt.dataTransfer.getData('text/plain');
            onTaskDrop(this.status, taskId, droppedTarget);
        });
    }
}