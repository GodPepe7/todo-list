import css from './styles.css';
import displayController from './displayController.js';
import todoController from './todoController';

todoController.loadLocalStorage();
displayController.displayProjects();
displayController.displayToDosOfProject();
