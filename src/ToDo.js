const ToDo = (title, description, 
    dueDate, priority, notes) => {
    const complete = false
    const getTitle = () => title;
    const getDesc = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    const getComplete = () => complete;
    const toggleComplete = () => {
        complete = !complete;
    }
    return {getTitle, getDesc, getDueDate, getPriority, 
        getNotes, getComplete, toggleComplete};
};

export default ToDo;