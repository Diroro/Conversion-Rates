import * as React from 'react';
import TasksList from './TasksList';
import { connect } from 'react-redux';
import { expandSection, collapseSection, createTask } from '../redux/actions/todoActions';

class SectionItem extends React.Component {
    state = {
        inputValue: ''
    }

    toggleExpand = () => {
        const { expand, collapse, section } = this.props;
        if (!section.expanded) {
            expand(section.id);
        } else {
            collapse(section.id);
        }
    }

    onChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { addTask, section } = this.props;
        const { inputValue } = this.state;
        if ( inputValue && inputValue.trim()) {
            addTask(section.id, inputValue.trim());
            this.setState({ inputValue: '' })
        }
    }

    render() {
        const { 
            onChange,
            onSubmit,
            toggleExpand, 
            state: { inputValue },
            props: { section }
        } = this;
       
        return (
            <div>
                <div onClick={toggleExpand}>{section.name}</div>
                {section.expanded && (
                    <React.Fragment>
                        { section.tasks && <TasksList tasks={section.tasks} /> }
                        <form onSubmit={onSubmit}>
                            <input value={inputValue} onChange={onChange}/>
                            <button>Add new todo</button>
                        </form>
                    </React.Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log('New props: ', props);
    console.log('Changed object: ', state.todo.sections[props.sectionId]);
    return {
        section: state.todo.sections[props.sectionId]
    }
};

const mapDispatchToProps = (dispatch) => ({
    expand: (sectionId) => dispatch(expandSection(sectionId)),
    collapse: (sectionId) => dispatch(collapseSection(sectionId)),
    addTask: (sectionId, name) => dispatch(createTask(sectionId, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(SectionItem);
