const Project = (title, todoArr) => {
    const getTitle = () => title;
    const getToDoArr = () => todoArr;
    const addToDo = (newToDo) => {
        todoArr.push(newToDo);
    };
    const removeToDo = (idx) => {
        todoArr.splice(idx, 1);
    };
    const getToDo = (idx) => todoArr[idx];
    return {getTitle, getToDoArr, addToDo, removeToDo, getToDo}
}

export default Project;