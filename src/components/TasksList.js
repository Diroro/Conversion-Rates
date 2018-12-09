import React from 'react';

const TasksList = (props) => (
    <ul>
        { props.tasks.map(((task, i) => (
            <li key={i}>{task.name}</li>
        )))}
    </ul>
);

export default TasksList;
