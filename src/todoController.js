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
        const idx = projectList.length - 1;
    };

    const getActiveProjectID = () => {
        return projectList.indexOf(activeProject);
    }

    const addToDo = (title, description, dueDate, priority) => {
        const newToDo = ToDo(title, description, dueDate, priority);
        activeProject.addToDo(newToDo);
    };

    const getCurrentTitleAndToDos = () => {
        const title = activeProject.getTitle();
        const todoArr = activeProject.getToDoArr();
        const todos = [];
        console.log(todoArr);
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
        // IDs are just their index in the projectList and the first 3 are the
        // preset Projects (all, today, week)
        const ALL_TODAY_WEEK_ID = 3
        if (id < ALL_TODAY_WEEK_ID) refreshAllProject(id); 
        activeProject = projectList[id];
    };
    
    const refreshAllProject = (id) => {
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
                        console.log(isThisWeek(todo.getDueDate()), { weekStartsOn: 1 });
                        return isThisWeek(todo.getDueDate(), { weekStartsOn: 1 });
                    });
                    refreshedToDos.push(...onlyTodayToDos);
                }
                break;
        }
        project.setToDoArr(refreshedToDos);
    }

    return { createProject, toggleComplete, getCurrentTitleAndToDos, getActiveProjectID, switchProject, addToDo, deleteToDo, toggleComplete }

})();

export default todoController;