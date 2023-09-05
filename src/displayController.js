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
        formToDo = document.querySelector('#todo-form'),
        addToDoBtn = document.querySelector('.add-todo'),
        dialog = document.querySelector('#todo-popup'),
        allBtn = document.querySelector('#all-link'),
        todayBtn = document.querySelector('#today-link'),
        weekBtn = document.querySelector('#week-link'),
        mainContent = document.querySelector('.main-container')

    const clearProjects = () => {
        itemContainer.replaceChildren();
    }

    const displayProjects = () => {
        clearProjects();
        const fragment = document.createDocumentFragment();
        const titlesWithID = todoController.getTitlesWithID();
        titlesWithID.forEach(({ id, title }) => {
            const projectDiv = createHTMLProject(id, title);
            fragment.append(projectDiv);
        })
        itemContainer.append(fragment);
    }

    const addProjectBtnHandler = () => {
        addProjectInputDiv.style.display = 'flex';
        addProjectBtn.style.display = 'none';
    };
    addProjectBtn.addEventListener('click', addProjectBtnHandler);

    const addProjectInputBtnHandler = () => {
        const title = projectInputText.value;
        projectInputText.style.border = '1px black solid';
        projectInputText.placeholder = 'Title';
        if (title) {
            projectInputText.value = '';
            addProjectInputDiv.style.display = 'none';
            addProjectBtn.style.display = 'flex';
            todoController.createProject(title);
            displayProjects();
            displayToDosOfProject();
        } else {
            projectInputText.style.border = '2px red solid'
            projectInputText.placeholder = 'Must be filled out!'
        }
    };

    const createHTMLProject = (projectID, title) => {
        const displayHTML = document.querySelector('#project-template')
        const clone = displayHTML.content.cloneNode(true);
        const projectDiv = clone.querySelector('.project-item');
        projectDiv.dataset.projectID = projectID;
        const titleHolder = projectDiv.querySelector('a');
        titleHolder.textContent = title;
        projectDiv.addEventListener('click', clickProjectBtnHandler);
        const editBtn = projectDiv.querySelector('#edit-project');
        editBtn.addEventListener('click', editProjectBtnHandler);
        return clone;
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

    const editProjectBtnHandler = (e) => {
        e.stopPropagation();
        const projectDiv = e.target.parentNode;
        const editProjectInputDiv = document.querySelector('.add-project-input').cloneNode(true);
        projectDiv.after(editProjectInputDiv);
        projectDiv.style.display = 'none';
        editProjectInputDiv.style.display = 'flex';
        const confirmEditBtn = editProjectInputDiv.querySelector('.add-btn');
        const cancelEditBtn = editProjectInputDiv.querySelector('.cancel-btn');
        confirmEditBtn.addEventListener('click', () => {
            const id = projectDiv.dataset.projectID;
            const titleInput = editProjectInputDiv.querySelector('.add-project-input input');
            const title = titleInput.value;
            confirmEditBtnHandler(id, title);
        });
        cancelEditBtn.addEventListener('click', cancelEditBtnHandler);
    };

    const confirmEditBtnHandler = (id, title) => {
        todoController.editProjectTitle(id, title);
        displayProjects();
        displayToDosOfProject()
    };

    const cancelEditBtnHandler = () => {
        displayProjects();
    };

    const displayToDosOfProject = () => {
        clearMainContent();
        const id = todoController.getActiveProjectID();
        addToDoBtn.style.display = id < 3 ? 'none' : 'flex';    
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
        const { id, title, desc, due, prio, complete } = todo;
        const todoTemplate = document.querySelector('.todo-template');
        const clone = todoTemplate.content.cloneNode(true);
        const editToDoBtn = clone.querySelector('.edit-icon');
        editToDoBtn.addEventListener('click', editToDoBtnHandler);
        const deleteToDoBtn = clone.querySelector('.delete-icon');
        deleteToDoBtn.addEventListener('click', deleteToDoBtnHandler);
        const completeToDoBtn = clone.querySelector('input[type=checkbox]');
        completeToDoBtn.addEventListener('click', completeToDoBtnHandler);
        const titleHTML = clone.querySelector('.todo-item .title');
        titleHTML.textContent = title;
        const dueHTML = clone.querySelector('.due-date');
        dueHTML.textContent = due;
        const todoItemDiv = clone.querySelector('.todo-short');
        todoItemDiv.className += ' ' + prio;
        if (complete) {
            todoItemDiv.className += ' complete'
        }
        todoItemDiv.dataset.todoID = id;
        const expandDescDiv = clone.querySelector('.todo-expand');
        expandDescDiv.querySelector('.todo-desc').textContent = desc;
        todoItemDiv.addEventListener('click', () => todoItemDivClickHandler(expandDescDiv));
        return clone;
    };

    const completeToDoBtnHandler = (e) => {
        e.stopPropagation();
        const todoItemDiv = e.target.parentNode.parentNode;
        const todoID = todoItemDiv.dataset.todoID;
        todoController.toggleComplete(todoID);
        displayToDosOfProject();
    }

    const addToDoBtnHandler = () => {
        clearToDoForm();
        dialog.showModal();
    };
    addToDoBtn.addEventListener('click', addToDoBtnHandler);

    const todoItemDivClickHandler = (expandDescDiv) => {
        const displayState = expandDescDiv.style.display;
        expandDescDiv.style.display = displayState === 'none' ? 'block' : 'none';
    }

    const addToDoFormInputBtnHandler = () => {
        if(formToDo.checkValidity()) {
            const title = formTitleInput.value;
            const desc = formDescInput.value;
            const due = formDueInput.valueAsDate;
            const prio = formPrioInput.value;
            todoController.addToDo(title, desc, due, prio);
            displayToDosOfProject();
        }
    };
    formAddBtn.addEventListener('click', addToDoFormInputBtnHandler);

    const clearToDoForm = () => {
        formTitleInput.value = '';
        formDescInput.value = '';
        formDueInput.valueAsDate = new Date();
        formPrioInput.selectedIndex = 0;
    };

    const formCancelBtnHandler = () => {
        clearToDoForm();
        dialog.close();
    };
    formCancelBtn.addEventListener('click', formCancelBtnHandler);

    const editToDoBtnHandler = (e) => {
        e.stopPropagation();
        const todoItemDiv = e.target.parentNode.parentNode;
        const todoID = todoItemDiv.dataset.todoID;
        const currentToDo = todoController.getToDo(todoID);
        const complete = currentToDo.complete;
        const currentDate = currentToDo.due;
        const currentPrio = currentToDo.prio;
        const editDialog = dialog.cloneNode(true);
        mainContent.append(editDialog);
        setFormWithCurrentToDoValues(currentDate, currentPrio, editDialog);
        editDialog.showModal();
        const confirmEditToDoBtn = editDialog.querySelector('#form-add');
        const cancelEditToDoBtn = editDialog.querySelector('#form-cancel');
        confirmEditToDoBtn.textContent = 'Confirm';
        confirmEditToDoBtn.addEventListener('click', () => confirmEditToDoBtnHandler(todoID, complete, editDialog));
        cancelEditToDoBtn.addEventListener('click', () => cancelEditToDoBtnHandler(editDialog));
    }

    const setFormWithCurrentToDoValues = (date, prio, editDialog) => {
        editDialog.querySelector('#duedate').valueAsDate = date;
        console.log(prio);
        editDialog.querySelector('#priority').value = prio;
        console.log(editDialog.querySelector('#priority').value)
    };

    const confirmEditToDoBtnHandler = (id, complete, editDialog) => {
        const form = editDialog.querySelector('form');
        if(form.checkValidity()){
            const title = editDialog.querySelector('#title').value
            const desc = editDialog.querySelector('#desc').value
            const due = editDialog.querySelector('#duedate').valueAsDate
            const prio = editDialog.querySelector('#priority').value
            todoController.editToDo({ id, title, desc, due, prio, complete });
            editDialog.close();
            displayToDosOfProject();
        };
        }



    const cancelEditToDoBtnHandler = (editDialog) => {
        editDialog.close()
    };

    const deleteToDoBtnHandler = (e) => {
        const todoItemDiv = e.target.parentNode.parentNode;
        const todoID = todoItemDiv.dataset.todoID;
        todoController.deleteToDo(todoID);
        displayToDosOfProject();
    };

    allBtn.addEventListener('click', clickProjectBtnHandler);
    todayBtn.addEventListener('click', clickProjectBtnHandler);
    weekBtn.addEventListener('click', clickProjectBtnHandler);

    return {displayProjects, displayToDosOfProject}
})();

export default displayController;