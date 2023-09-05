let idCounter = 0;

const ToDo = (title, description, 
    dueDate, priority) => {
    const id = idCounter++;
    let complete = false;
    const getID = () => id;
    const getTitle = () => title;
    const getDesc = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getComplete = () => complete;
    const setTitle = (newTitle) => title = newTitle;
    const setDesc = (newDesc) => description = newDesc;
    const setDueDate = (newDue) => dueDate = newDue;
    const setPriority = (newPrio) => priority = newPrio;
    const setComplete = (newComplete) => complete = newComplete;
    const toggleComplete = () => {
        complete = !complete;
    }
    return {getTitle, getDesc, getDueDate, getPriority, 
        getComplete, toggleComplete, getID, setTitle, setDesc,
        setDueDate, setPriority, setComplete};
};

export default ToDo;