let idCounter = 0;

const Project = (title, todoArr) => {
    const id = idCounter++
    const getID = () => id;
    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;
    const getToDoArr = () => todoArr;
    const setToDoArr = (newArr) => todoArr = newArr; 
    const addToDo = (newToDo) => {
        todoArr.push(newToDo);
    };
    const removeToDo = (id) => {
        todoArr = todoArr.filter(todo => todo.getID() !== id);
    }
    const getToDo = (id) => todoArr.find((todo) => todo.getID() === +id);
    return { getID, getTitle, setTitle, getToDoArr, addToDo, removeToDo, getToDo, setToDoArr }
}

export default Project;