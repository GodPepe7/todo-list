import Project from "./Project";
import ToDo from "./ToDo";
import isThisWeek from 'date-fns/isThisWeek';
import isToday from 'date-fns/isToday';


const todoController = (() => {
    const allToDosProject = Project('All', []);
    const todayToDosProject = Project('Today', []);
    const weekToDosProject = Project('This week', []);
    const projectList = [allToDosProject, todayToDosProject, weekToDosProject];
    let activeProject = allToDosProject;

    const createProject = (title) => {
        const newProject = Project(title, []);
        activeProject = newProject;
        projectList.push(newProject);
    };

    const getActiveProjectID = () => {
        return activeProject.getID();
    }

    const addToDo = (title, description, dueDate, priority) => {
        const newToDo = ToDo(title, description, dueDate, priority);
        activeProject.addToDo(newToDo);
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
            const converted = { id, title, desc, due, prio, complete };
            todos.push(converted);
        });
        return { title, todos };
    }

    const toggleComplete = (id) => {
        id = +id;
        const todo = activeProject.getToDo(id);
        todo.toggleComplete();
    };

    const deleteToDo = (id) => {
        id = +id;
        activeProject.removeToDo(id)
    };

    const switchProject = (id) => {
        // IDs are just counted up, so the IDs of all, today and week are 0,1,2
        const AFTER_ALL_TODAY_WEEK_ID = 3
        if (id < AFTER_ALL_TODAY_WEEK_ID) refreshMainProject(id); 
        activeProject = projectList[id];
    };
    
    const refreshMainProject = (id) => {
        id = +id;
        const project = projectList[id];
        const refreshedToDos = [];
        switch(id) {
            case 0:
                for (let i = 3; i < projectList.length; i++) {
                    refreshedToDos.push(...projectList[i].getToDoArr());
                }
                break;
            case 1:
                for (let i = 3; i < projectList.length; i++) {
                    const currentToDos = projectList[i].getToDoArr();
                    const onlyTodayToDos = currentToDos.filter(todo => isToday(todo.getDueDate()));
                    refreshedToDos.push(...onlyTodayToDos);
                }
                break;
            case 2:
                for (let i = 3; i < projectList.length; i++) {
                    const currentToDos = projectList[i].getToDoArr();
                    const onlyTodayToDos = currentToDos.filter(todo => {
                        return isThisWeek(todo.getDueDate(), { weekStartsOn: 1 });
                    });
                    refreshedToDos.push(...onlyTodayToDos);
                }
                break;
        }
        project.setToDoArr(refreshedToDos);
    }

    const editProjectTitle = (id, title) => {
        projectList[id].setTitle(title);
    };

    const getTitlesWithID = () => {
        const userProjects = projectList.slice(3);
        const titlesWithID = userProjects.map((project) => {
            const id = project.getID();
            const title = project.getTitle();
            return {id, title};
        });
        return titlesWithID;
    } 

    return { createProject, editProjectTitle, toggleComplete, getCurrentTitleAndToDos, getActiveProjectID, switchProject, addToDo, deleteToDo, toggleComplete, getTitlesWithID }

})();

export default todoController;