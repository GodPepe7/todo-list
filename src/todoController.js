import Project from "./Project";
import ToDo from "./ToDo";
import isThisWeek from 'date-fns/isThisWeek';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO'

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
        saveProjectToLocalStorage(newProject);
    };

    const getActiveProjectID = () => {
        return activeProject.getID();
    }

    const addToDo = (title, description, dueDate, priority) => {
        const newToDo = ToDo(title, description, dueDate, priority);
        activeProject.addToDo(newToDo);
        saveProjectToLocalStorage(activeProject);
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
            const prio = todo.getPriority();
            const converted = { id, title, desc, due, prio, complete };
            todos.push(converted);
        });
        return { title, todos };
    }

    const getProjectOfToDo = (id) => {
        const projectsWithToDo = projectList.filter(project => project.getToDo(id));
        const project = projectsWithToDo[projectsWithToDo.length - 1];
        return project;
    };

    const toggleComplete = (id) => {
        id = +id;
        const projectOfToDo = getProjectOfToDo(id);
        const todo = projectOfToDo.getToDo(id);
        todo.toggleComplete();
        saveProjectToLocalStorage(projectOfToDo);
    };

    const deleteToDo = (id) => {
        id = +id;
        const projectOfToDo = getProjectOfToDo(id);
        projectOfToDo.removeToDo(id);
        saveProjectToLocalStorage(projectOfToDo);
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
        switch (id) {
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
        saveProjectToLocalStorage(activeProject);
    };

    const getTitlesWithID = () => {
        const userProjects = projectList.slice(3);
        const titlesWithID = userProjects.map((project) => {
            const id = project.getID();
            const title = project.getTitle();
            return { id, title };
        });
        return titlesWithID;
    }

    const editToDo = (newTodo) => {
        const { id, title, desc, due, prio, complete } = newTodo;
        const todo = activeProject.getToDo(id);
        todo.setTitle(title);
        todo.setDesc(desc);
        todo.setDueDate(due);
        todo.setPriority(prio);
        todo.setComplete(complete);
        const projectOfToDo = getProjectOfToDo(id);
        saveProjectToLocalStorage(projectOfToDo);
    }

    const getToDo = (id) => {
        const todo = activeProject.getToDo(id);
        const title = todo.getTitle();
        const desc = todo.getDesc();
        const due = todo.getDueDate();
        const complete = todo.getComplete();
        const prio = todo.getPriority();
        return { id, title, desc, due, prio, complete };
    }
    
    const jsonToDoArr = (project) => {
        const todoArr = project.getToDoArr();
        const todoJSONArr = todoArr.map(todo => {
            const id = todo.getID();
            const title = todo.getTitle();
            const desc = todo.getDesc();
            const due = todo.getDueDate();
            const complete = todo.getComplete();
            const prio = todo.getPriority()
            const values = { id, title, desc, due, prio, complete };
            const todoJSON = JSON.stringify(values);
            return todoJSON;
        })
        const todoJSONArrJSON = JSON.stringify(todoJSONArr);
        return todoJSONArrJSON;
    };

    const saveProjectToLocalStorage = (project) => {
        if(project.getID() < 3) return;
        const todoJSONArrJSON = jsonToDoArr(project);
        const id = project.getID();
        const title = project.getTitle();
        const projectSimplified = {title, todoJSONArrJSON};
        const projectJSON = JSON.stringify(projectSimplified);
        localStorage.setItem(id, projectJSON);
    };
    
    const loadLocalStorage = () => {
        for(let i = 0; i < localStorage.length; i++){
            const id = localStorage.key(i);
            const projectJSON = localStorage.getItem(localStorage.key(i));
            const {title, todoJSONArrJSON} = JSON.parse(projectJSON);
            const todoJSONArr = JSON.parse(todoJSONArrJSON);
            const todoArr = todoJSONArr.map(todoJSON => {
                const { id, title, desc, due, prio, complete } = JSON.parse(todoJSON);
                const parsedDue = parseISO(due);
                const todoClone = ToDo(title, desc, parsedDue, prio);
                todoClone.setID(id);
                todoClone.setComplete(complete);
                return todoClone;
            });
            const projectClone = Project(title, todoArr);
            projectClone.setID(id);
            projectList.push(projectClone);
        }
        projectList.sort((p1, p2) => p1.getID() - p2.getID());
        refreshMainProject(0);
    }

    return {
        createProject, editProjectTitle, toggleComplete,
        getCurrentTitleAndToDos, getActiveProjectID, switchProject, getToDo,
        addToDo, deleteToDo, toggleComplete, getTitlesWithID, editToDo, 
        loadLocalStorage
    };

})();

export default todoController;