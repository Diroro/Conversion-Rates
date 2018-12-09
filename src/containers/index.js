import React from 'react';
import { connect } from 'react-redux';
import SectionList from '../components/SectionList';
import { loadSections, createSection } from '../redux/actions/todoActions';
import { selectIds } from '../redux/reducers/todoReducer';

class Main extends React.PureComponent {
    state = {
        inputValue: ''
    }
    componentDidMount() {
        this.props.loadSections();
    }

    onChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { createSection } = this.props;
        const { inputValue } = this.state;
        if ( inputValue && inputValue.trim()) {
            createSection(inputValue);
            this.setState({ inputValue: '' })
        }
    }

    render() {
        const { 
            onChange, 
            onSubmit,
            props: { sectionIds },
            state: { inputValue } 
        } = this;

        return (
            <div>
                <SectionList sectionIds={sectionIds} />
                <form onSubmit={onSubmit}>
                    <input value={inputValue} onChange={onChange}/>
                    <button>Add New Section</button>
                </form>
            </div>
        );
    }

}


const mapStateToProps = (state) => ({
    sectionIds: selectIds(state.todo)
});

const mapDispatchToProps = (dispatch) => ({
    loadSections: () => dispatch(loadSections()),
    createSection: (name) => dispatch(createSection(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

