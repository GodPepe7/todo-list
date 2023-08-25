const createToDo = (title, description, 
    dueDate, priority, notes) => {
    const complete = false
    const getTitle = () => title;
    const getDesc = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    const getComplete = () => complete;
    const setComplete = () => {
        complete = !complete;
    }
    return {getTitle, getDesc, getDueDate, getPriority, 
        getNotes, getComplete, setComplete};
};

export default createToDo;