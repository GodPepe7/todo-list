import Project from "./Project";
import ToDo from "./ToDo";
import displayController from "./displayController";

const todoController = (() => {
    const testProject = ToDo('test', 'this is a test project', '01/09/2023', 'high')
    const defaultProject = Project('default', []);
    const projectList = [defaultProject];
    let activeProject = defaultProject;

    const createProject = (title) => {
        const newProject = Project(title, [testProject, testProject]);
        activeProject = newProject;
        projectList.push(newProject);
        const idx = projectList.length - 1;
        displayController.createProject(title, idx);
        displayController.displayProject(activeProject.getTitle(), activeProject.getToDoArr());
    };

    const addToDo = (title, description, dueDate, priority, notes) => {
        const newToDo = ToDo(title, description, dueDate, priority, notes);
        activeProject.addToDo(newToDo);
        //DOM
    };

    const changeComplete = (idx) => {
        const toBeChangedToDo = activeProject.getToDo(idx);
        toBeChangedToDo.toggleComplete();
        //DOM
    };

    const removeToDo = (idx) => {
        activeProject.removeToDo(idx)
    };

    const getToDo = (idx) => {
        return projectList[idx]
    };

    const changeActiveProject = (idx) => {
        activeProject = projectList[idx];
        displayController.displayProject(activeProject.title, activeProject.getToDoArr());
    };

    return {createProject, changeActiveProject}

})();

export default todoController;