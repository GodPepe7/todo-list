import Project from "./Project";
import ToDo from "./ToDo";
import displayController from "./displayController";

const todoController = (() => {
    const defaultProject = Project('default', []);
    const projectList = [defaultProject];
    let activeProject = defaultProject;

    const createProject = (title) => {
        const newProject = Project(title, []);
        activeProject = newProject;
        projectList.push(newProject);
        const idx = projectList.length - 1;
    };

    const getActiveProjectID = () => {
        return projectList.indexOf(activeProject);
    }

    const addToDo = (title, description, dueDate, priority) => {
        const newToDo = ToDo(title, description, dueDate, priority);
        activeProject.addToDo(newToDo);
        // displayController.displayProject(activeProject.getTitle(), activeProject.getToDoArr());
    };

    const getCurrentTitleAndToDos = () => {
        const title = activeProject.getTitle();
        const todoArr = activeProject.getToDoArr();
        const todos = [];
        todoArr.forEach((todo) => {
            const id = todo.getID();
            const title = todo.getTitle();
            const desc = todo.getDesc();
            const due = todo.getDueDate();
            const complete = todo.getComplete();
            const prio = todo.getPriority()
            const converted = {id, title, desc, due, prio, complete};
            todos.push(converted);
        });
        return {title, todos};
    }

    const changeComplete = (idx) => {
        const toBeChangedToDo = activeProject.getToDo(idx);
        toBeChangedToDo.toggleComplete();
        //DOM
    };

    const deleteToDo = (idx) => {
        activeProject.removeToDo(idx)
    };

    const getToDo = (idx) => {
        return projectList[idx]
    };

    const switchProject = (idx) => {
        activeProject = projectList[idx];
    };

    return {createProject, getCurrentTitleAndToDos, getActiveProjectID, switchProject, addToDo, deleteToDo}

})();

export default todoController;