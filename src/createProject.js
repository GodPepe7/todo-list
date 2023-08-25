const createProject = (title, todoArr) => {
    const getTitle = () => title;
    const getToDoArr = () => todoArr;
    const addToDo = (newToDo) => {
        todoArr.push(newToDo);
    };
    const removeToDo = (idx) => {
        todoArr.splice(idx, 1);
    };

    return {getTitle, getToDoArr, addToDo, removeToDo}
}

export default createProject;