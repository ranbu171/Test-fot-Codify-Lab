export default class Task {
    constructor( id, title, userId = 1, completed = false) {
        this.userId = userId
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
