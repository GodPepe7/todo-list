const Project = (title, todoArr) => {
    const getTitle = () => title;
    const getToDoArr = () => todoArr;
    const setToDoArr = (newArr) => todoArr = newArr; 
    const addToDo = (newToDo) => {
        todoArr.push(newToDo);
    };
    const removeToDo = (id) => {
        todoArr = todoArr.filter(todo => todo.getID() !== id);
    }
    const getToDo = (id) => todoArr.find((todo) => todo.getID() === +id);
    return { getTitle, getToDoArr, addToDo, removeToDo, getToDo, setToDoArr }
}

export default Project;