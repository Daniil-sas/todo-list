import { Status } from "../const.js";
import { generateID } from "../utils.js";

export const tasks = [
    {
        status: Status.BACKLOG,
        tasks: []
    },
    {
        status: Status.PROCESSING,
        tasks: [
            {
                id: generateID(),
                name: "Выучить JS"
            },
            {
                id: generateID(),
                name: "Выучить React"
            },
            {
                id: generateID(),
                name: "Создать приложение на Vue.js"
            }
        ]
    },
    {
        status: Status.DONE,
        tasks: [
            {
                id: generateID(),
                name: "Разработать сервер на .NET (C#)"
            },
            {
                id: generateID(),
                name: "Настроить маршрутизацию в React"
            }
        ]
    },
    {
        status: Status.BASKET,
        tasks: [
            {
                id: generateID(),
                name: "Оптимизировать код на Vue.js"
            },
            {
                id: generateID(),
                name: "Удалить ненужные файлы"
            },
            {
                id: generateID(),
                name: "Очистить базу данных"
            },
            {
                id: generateID(),
                name: "Изучить архитектуру .NET Core"
            }
        ]
    }
]