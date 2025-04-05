import { Status } from "../const.js";

export const tasks = [
    {
        status: Status.BACKLOG,
        tasks: []
    },
    {
        status: Status.PROCESSING,
        tasks: ["Выучить JS", "Выучить React", "Создать приложение на Vue.js", ]
    },
    {
        status: Status.DONE,
        tasks: ["Разработать сервер на .NET (C#)", "Настроить маршрутизацию в React"]
    },
    {
        status: Status.BASKET,
        tasks: ["Оптимизировать код на Vue.js", "Удалить ненужные файлы", "Очистить базу данных", "Изучить архитектуру .NET Core"]
    }
]