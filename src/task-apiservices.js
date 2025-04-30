import ApiService from "./framework/view/api-service.js";

const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

export default class TaskApiServices extends ApiService {
    get tasks() {
        return this._load({url: 'tasks'}).then(ApiService.parseResponse);
    }

    async addTask(task) {
        const response = await this._load({
            url: 'tasks',
            method: Method.POST,
            body: JSON.stringify(task),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return ApiService.parseResponse(response);
    }


    async updateTask(task) {
        const response = await this._load({
            url: `tasks/${task.id}`,
            method: Method.PUT,
            body: JSON.stringify(task),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const parseResponse = await ApiService.parseResponse(response);

        return parseResponse;
    }

    async deleteTask(taskId) {
        await this._load({
            url: `tasks/${taskId}`,
            method: Method.DELETE,
        });
    }
}