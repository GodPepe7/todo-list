import todoController from "./todoController";

const displayController = (() => {
    const addProjectBtn = document.querySelector('.add-project'),
        addProjectInputDiv = document.querySelector('.add-project-input'),
        itemContainer = document.querySelector('.item-container'),
        projectInputAddBtn = document.querySelector('.add-btn'),
        projectInputCancelBtn = document.querySelector('.cancel-btn'),
        projectInputText = document.querySelector('.add-project-input input'),
        todoContainer = document.querySelector('.todo-container'),
        formAddBtn = document.querySelector('#form-add'),
        formCancelBtn = document.querySelector('#form-cancel'),
        formTitleInput = document.querySelector('#title'),
        formDescInput = document.querySelector('#desc'),
        formDueInput = document.querySelector('#duedate'),
        formPrioInput = document.querySelector('#priority'),
        addToDoBtn = document.querySelector('.add-todo'),
        dialog = document.querySelector('#todo-popup'),
        allBtn = document.querySelector('#all-link'),
        todayBtn = document.querySelector('#today-link'),
        weekBtn = document.querySelector('#week-link')

    const addProjectBtnHandler = () => {
        addProjectInputDiv.style.display = 'flex';
        addProjectBtn.style.display = 'none';
    };
    addProjectBtn.addEventListener('click', addProjectBtnHandler);

    const addProjectInputBtnHandler = () => {
        const title = projectInputText.value
        projectInputText.style.border = '1px black solid'
        projectInputText.placeholder = 'Title'
        if (title) {
            projectInputText.value = '';
            addProjectInputDiv.style.display = 'none';
            addProjectBtn.style.display = 'flex';
            todoController.createProject(title);
            createProject(title);
            displayToDosOfProject()
        } else {
            projectInputText.style.border = '2px red solid'
            projectInputText.placeholder = 'Must be filled out!'
        }
    };

    const createProject = (title) => {
        const activeProjectID = todoController.getActiveProjectID()
        const displayHTMl = document.querySelector('.project-template');
        const clone = displayHTMl.content.cloneNode(true);
        const titleHolder = clone.querySelector('a');
        titleHolder.textContent = title;
        const projectDiv = clone.querySelector('.project-item');
        projectDiv.dataset.projectID = activeProjectID;
        projectDiv.addEventListener('click', clickProjectBtnHandler);
        itemContainer.append(clone);
    }
    projectInputAddBtn.addEventListener('click', addProjectInputBtnHandler);

    const cancelProjectInputBtnHandler = () => {
        projectInputText.style.border = '1px black solid'
        projectInputText.placeholder = 'Title'
        projectInputText.value = '';
        addProjectInputDiv.style.display = 'none';
        addProjectBtn.style.display = 'flex';
    };
    projectInputCancelBtn.addEventListener('click', cancelProjectInputBtnHandler);

    const clickProjectBtnHandler = (e) => {
        const id = e.target.dataset.projectID;
        todoController.switchProject(id);
        displayToDosOfProject();
    }

    const clearMainContent = () => {
        todoContainer.replaceChildren();
    }

    const displayToDosOfProject = () => {
        clearMainContent();
        const { title, todos } = todoController.getCurrentTitleAndToDos();
        const projectTitleHTML = document.createElement('h3');
        projectTitleHTML.textContent = title;
        projectTitleHTML.className = 'project-title';
        const todoFragment = document.createDocumentFragment();
        todoFragment.append(projectTitleHTML);
        todos.forEach((todo) => {
            const todoHTML = createToDoHTML(todo);
            todoFragment.append(todoHTML);
        })
        todoContainer.append(todoFragment);
    };

    const createToDoHTML = (todo) => {
        const {id, title, desc, due, prio, complete} = todo;
        const todoTemplate = document.querySelector('.todo-template');
        const clone = todoTemplate.content.cloneNode(true);
        const deleteToDoBtn = clone.querySelector('.delete-icon');
        deleteToDoBtn.addEventListener('click', deleteToDoBtnHandler);
        const completeToDoBtn = clone.querySelector('input[type=checkbox]');
        completeToDoBtn.addEventListener('click', completeToDoBtnHandler);
        const titleHTML = clone.querySelector('.todo-item .title');
        titleHTML.textContent = title;
        const dueHTML = clone.querySelector('.due-date');
        dueHTML.textContent = due;
        const todoItemDiv = clone.querySelector('.todo-item');
        todoItemDiv.className += ' ' + prio;
        if(complete) {
            todoItemDiv.className += ' complete'
        }
        todoItemDiv.dataset.todoID = id;
        return clone;
    };

    const completeToDoBtnHandler = (e) => {
        const todoItemDiv = e.target.parentNode.parentNode;
        const todoID = todoItemDiv.dataset.todoID;
        todoController.toggleComplete(todoID);
        displayToDosOfProject();
    }

    const addToDoBtnHandler = () => {
        clearToDoForm();
        dialog.showModal();
    };
    addToDoBtn.addEventListener('click', addToDoBtnHandler)

    const addToDoFormInputBtnHandler = () => {
        const title = formTitleInput.value;
        const desc = formDescInput.value;
        const due = formDueInput.valueAsDate;
        const prio = formPrioInput.value;
        todoController.addToDo(title, desc, due, prio);
        displayToDosOfProject();
    };
    formAddBtn.addEventListener('click', addToDoFormInputBtnHandler);

    const clearToDoForm = () => {
        formTitleInput.value = ''
        formDescInput.value = '';
        formDueInput.valueAsDate = new Date();
        formPrioInput.selectedIndex = 0;
    };

    const formCancelBtnHandler = () => {
        clearToDoForm();
        dialog.close();
    };
    formCancelBtn.addEventListener('click', formCancelBtnHandler);

    const deleteToDoBtnHandler = (e) => {
        const todoItemDiv = e.target.parentNode.parentNode;
        const todoID = todoItemDiv.dataset.todoID;
        todoController.deleteToDo(todoID);
        displayToDosOfProject();
    };

    allBtn.addEventListener('click', clickProjectBtnHandler);
    todayBtn.addEventListener('click', clickProjectBtnHandler);
    weekBtn.addEventListener('click', clickProjectBtnHandler);
    
    return
})();

export default displayController;