import Project from "./Project";
import ToDo from "./ToDo";

const todoController = (() => {
    const defaultProject = Project('default', []);
    const projectList = [defaultProject];
    const activeProject = defaultProject;

    const createProject = (title) => {
        const newProject = Project(title, []);
        activeProject = newProject;
        projectList.push(newProject);
        //DOM
    };

    const addToDo = (title, description, dueDate, priority, notes) => {
        const newToDo = ToDo(title, description, dueDate, priority, notes);
        activeProject.addToDo(newToDo);
        //DOM
    }

    const changeComplete = (idx) => {
        const toBeChangedToDo = activeProject.getToDo(idx);
        toBeChangedToDo.toggleComplete();
        //DOM
    }

    const removeToDo = (idx) => {
        activeProject.removeToDo(idx)
    }

})();

export default todoController;