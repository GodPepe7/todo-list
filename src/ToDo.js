let idCounter = 0;

const ToDo = (title, description, 
    dueDate, priority) => {
    const id = idCounter++;
    const complete = false
    const getID = () => id;
    const getTitle = () => title;
    const getDesc = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getComplete = () => complete;
    const toggleComplete = () => {
        complete = !complete;
    }
    return {getTitle, getDesc, getDueDate, getPriority, 
        getComplete, toggleComplete, getID};
};

export default ToDo;