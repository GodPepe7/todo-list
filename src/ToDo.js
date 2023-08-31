const ToDo = (title, description, 
    dueDate, priority) => {
    const complete = false
    const getTitle = () => title;
    const getDesc = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getComplete = () => complete;
    const toggleComplete = () => {
        complete = !complete;
    }
    return {getTitle, getDesc, getDueDate, getPriority, 
        getComplete, toggleComplete};
};

export default ToDo;