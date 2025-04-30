import { OrderPosition, Status, UpdateType, UserAction } from "../const.js";
import { generateID } from "../utils.js";
import Observable from "../framework/observable.js";

export default class TasksModel extends Observable {
    #tasksApiServices = null;
    #boardtasks = null;

    constructor({tasksApiServices}) {
        super();
        this.#tasksApiServices = tasksApiServices;
    }

    async init() {
        try {
            const tasks = await this.#tasksApiServices.tasks;
            this.#boardtasks = this.returnParsedTask(tasks);
        } catch (err) {
            this.#boardtasks = [];
        }

        if (!this.hasBascketTasks()) {
            this.#boardtasks.push({
                status: Status.BASKET,
                tasks: []
            });
        }

        this._notify(UpdateType.INIT);
    }

    returnParsedTask(tasks) {
        const parsedTasks = [];
        
        while (tasks.length != 0) {
            const statusTasks = tasks[0].status;
            const tasksByStatus = tasks.filter(f => f.status === statusTasks);
            tasks = tasks.filter(f => f.status !== statusTasks);

            const newElementToParsedTasks = {
                status: statusTasks,
                tasks: []
            }

            for (const task of tasksByStatus) {
                newElementToParsedTasks.tasks.push({
                    id: task.id,
                    title: task.title,
                    orderInStatus: task.orderInStatus
                });
            }

            newElementToParsedTasks.tasks.sort((a, b) => {
                const orderA = a.orderInStatus;
                const orderB = b.orderInStatus;

                if (orderA < orderB) {
                    return -1;
                }
                else if (orderA > orderB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            parsedTasks.push(newElementToParsedTasks);
        }

        this.#normolize(parsedTasks);
        return parsedTasks;
    }

    #normolize(tasks) {
        this.#swapStatusTasksToSupposedPosition(tasks, 0, Status.BACKLOG);
        this.#swapStatusTasksToSupposedPosition(tasks, tasks.length - 1, Status.BASKET);
    }

    #swapStatusTasksToSupposedPosition(tasks, supposedIndex, status) {
        if (tasks[supposedIndex].status !== status) {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].status === status) {
                    const buff = tasks[supposedIndex];
                    tasks[supposedIndex] = tasks[i];
                    tasks[i] = buff;
                }
            }
        }
    }

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(f => f.status === status)[0];
    }

    getTaskInfoById(taskId) {
        for (const listTask of this.#boardtasks) {
            const taskById = listTask.tasks.filter(t => t.id === taskId)[0];

            if (taskById) {
                const currStatus = listTask.status;
                
                return [currStatus, taskById];
            }
        }
    }

    async addTask(title) {
        const newTask = {
            id: generateID(),
            status: Status.BACKLOG,
            title: title,
            orderInStatus: (this.getTasksByStatus(Status.BACKLOG).tasks.length ?? 0) + 1
        };

        try {
            const createdTask = await this.#tasksApiServices.addTask(newTask);
            this.getTasksByStatus(Status.BACKLOG).tasks.push({
                id: createdTask.id,
                title: createdTask.title,
                orderInStatus: createdTask.orderInStatus
            });

            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch(err) {
            console.error('Ошибка при добавлении задачи на сервер:');
            throw err;
        }
    }

    removeTaskFromStatus(task, status) {
        const listTaskOfStatus = this.getTasksByStatus(status);

        const indexTask = listTaskOfStatus.tasks.indexOf(task);

        if (indexTask > -1) {
            listTaskOfStatus.tasks.splice(indexTask, 1);
        }
    }

    async removeBasketTask() {
        const basketTasks = this.getTasksByStatus(Status.BASKET);

        try {
            Promise.all(basketTasks.tasks.map(task => this.#tasksApiServices.deleteTask(task.id)));

            basketTasks.tasks.length = 0;
            
            this._notify(UserAction.DELETE_TASK, { status: Status.BASKET });
        } catch(err) {
            console.log('Ошибка при удалении задач из корзины на сервере: ', err);
            throw err;
        }
    }

    hasBascketTasks() {
        return this.#boardtasks.some(task => task.status === Status.BASKET);
    }

    async updateTaskStatus(newStatus, taskId, droppedTask) {
        const [oldStatus, task] = this.getTaskInfoById(taskId);

        if (task && task.id !== droppedTask.taskId) {
            const droppedTaskList = this.getTasksByStatus(newStatus);
            const order = droppedTask.order;

            try {
                this.removeTaskFromStatus(task, oldStatus);

                if (order === OrderPosition.START || order === OrderPosition.END) {
                    const indexSet = order === OrderPosition.START ? 0 : droppedTaskList.tasks.length;
                    droppedTaskList.tasks.splice(indexSet, 0, task);
                } else {
                    const indexDroppedTask = droppedTaskList.tasks.indexOf(this.getTaskInfoById(droppedTask.taskId)[1]) + (order === OrderPosition.ABOVE ? 0 : 1);
                    droppedTaskList.tasks.splice(indexDroppedTask, 0, task);
                }

                const indexTask = droppedTaskList.tasks.indexOf(task);
                task.orderInStatus = indexTask + 1;

                const tasksByOldStatus = this.getTasksByStatus(oldStatus).tasks;
                const updatedTask = { ...task };
                updatedTask.status = newStatus;

                this.#updateOrder(tasksByOldStatus, droppedTaskList.tasks, updatedTask);
                this._notify(UserAction.UPDATE_TASK, updatedTask);
            } catch(err) {
                console.error('Ошибка при обновлении статуса задачи: ', err);
                throw err;
            }
        }
    }

    #mergeUpdatedTaskArray(toArray, fromArray) {
        fromArray.forEach((task) => toArray.push(task));
    }

    #updateOrder(oldList, newList, task) {
        const allTasksToUpdate = [
            task,
            ...this.#update(oldList),
            ...this.#update(newList)
        ];

        const updatePromises = allTasksToUpdate.map(
            task => this.#tasksApiServices.updateTask(task)
        );

        Promise.all(updatePromises)
            .then(tasks => {
                this._notify(UserAction.UPDATE_TASK, tasks);
            })
            .catch(error => {
                console.error('Ошибка обновления порядка:', error);
            });
    }

    #update(listWhereUpdate) {
        const updatedTask = [];
        for (let i = 0; i < listWhereUpdate.length; i++) {
            const curTask = listWhereUpdate[i];
            if (curTask.orderInStatus !== i + 1) {
                curTask.orderInStatus = i + 1;
                updatedTask.push(curTask);
            }
        }

        return updatedTask;
    }
}