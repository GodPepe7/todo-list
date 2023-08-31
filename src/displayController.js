import todoController from "./todoController";

const displayController = (() => {
    const addProjectBtn = document.querySelector('.add-project'),
        addProjectInputDiv = document.querySelector('.add-project-input'),
        itemContainer = document.querySelector('.item-container'),
        projectInputAddBtn = document.querySelector('.add-btn'),
        projectInputCancelBtn = document.querySelector('.cancel-btn'),
        projectInputText = document.querySelector('.add-project-input input'),
        mainContainer = document.querySelector('.main-container');
    const allBtn = document.querySelector('#all-link');
    
    const addProjectBtnHandler = () => {
        addProjectInputDiv.style.display = 'flex';
        addProjectBtn.style.display = 'none';
    };

    const addProjectInputBtnHandler = () => {
        const title = projectInputText.value
        projectInputText.style.border = '1px black solid'
        projectInputText.placeholder= 'Title'
        if(title) {
            projectInputText.value = '';
            addProjectInputDiv.style.display = 'none';
            addProjectBtn.style.display = 'flex';
            todoController.createProject(title);
        } else {
            projectInputText.style.border = '2px red solid'
            projectInputText.placeholder= 'Must be filled out!'
        }
    };

    const cancelProjectInputBtnHandler = () => {
        projectInputText.style.border = '1px black solid'
        projectInputText.placeholder= 'Title'
        projectInputText.value = '';
        addProjectInputDiv.style.display = 'none';
        addProjectBtn.style.display = 'flex';
    };

    projectInputAddBtn.addEventListener('click', addProjectInputBtnHandler);
    projectInputCancelBtn.addEventListener('click', cancelProjectInputBtnHandler);
    const allBtnHandler = () => {
        
    };
    addProjectBtn.addEventListener('click', addProjectBtnHandler);

    const clickProjectBtnHandler = (e) => {
        const idx = e.target.dataset.index;
        todoController.changeActiveProject(idx);
    }

    const clearMainContent = () => {
        mainContainer.replaceChildren();
    }

    const createProject = (title, idx) => {
        const displayHTMl = document.querySelector('.project-template');
        const clone = displayHTMl.content.cloneNode(true);
        const titleHolder = clone.querySelector('a');
        titleHolder.textContent = title;
        clone.querySelector('.project-item').dataset.projectIndex = idx;
        clone.addEventListener('click', clickProjectBtnHandler);
        itemContainer.append(clone);
    }

    const displayProject = (title, todos) => {
        clearMainContent();
        const projectTitleHTML = document.createElement('h3');
        projectTitleHTML.textContent = title;
        projectTitleHTML.className = 'project-title';
        projectTitleHTML.textContent = title; 
        const todoContainer = document.createDocumentFragment();
        todoContainer.append(projectTitleHTML);
        todos.forEach((todo) => {
            const todoHTML = createToDoHTML(todo);
            todoContainer.append(todoHTML);
        })
        mainContainer.append(todoContainer);
    };
    
    const createToDoHTML = (todo) => {
        const todoTemplate = document.querySelector('.todo-template');
        const title = todo.getTitle();
        const desc = todo.getDesc();
        const dueDate = todo.getDueDate();
        const prio = todo.getPriority();
        const isComplete = todo.getComplete();
        const clone = todoTemplate.content.cloneNode(true);
        const titleHTML = clone.querySelector('.todo-item .title');
        titleHTML.textContent = title;
        const dueHTML = clone.querySelector('.due-date');
        dueHTML.textContent = dueDate;
        clone.className += prio;
        return clone;
    };

    return {createProject, displayProject}
})();

export default displayController;