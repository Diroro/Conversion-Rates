import { getSectionListDB, addSection, addTask  } from '../../scripts/firebase';

export const SectionActionTypes = {
    LOAD_SECTIONS_REQUEST: 'LOAD_SECTIONS_REQUEST',
    LOAD_SECTIONS_SUCCESS: 'LOAD_SECTIONS_SUCCESS',
    LOAD_SECTIONS_FAILED: 'LOAD_SECTIONS_FAILED',
    
    ADD_SECTION_REQUEST: 'ADD_SECTION_REQUEST',
    ADD_SECTION_SUCCESS: 'ADD_SECTION_SUCCESS',
    ADD_SECTION_FAILED: 'ADD_SECTION_FAILED',

    EXPAND_SECTION: 'EXPAND_SECTION',
    COLLAPSE_SECTION: 'COLLAPSE_SECTION',
    
     
    ADD_TASK_REQUEST: 'ADD_TASK_REQUEST',
    ADD_TASK_SUCCESS: 'ADD_TASK_SUCCESS',
    ADD_TASK_FAILED: 'ADD_TASK_FAILED',
    // _SECTIONS_REQUEST: 'LOAD_SECTIONS_REQUEST',
    // LOAD_SECTIONS_SUCCESS: 'LOAD_SECTIONS_SUCCESS',
    // LOAD_SECTIONS_FAILED: 'LOAD_SECTIONS_FAILED',
    

    // LOAD_SECTIONS_REQUEST: 'LOAD_SECTIONS_REQUEST',
    // LOAD_SECTIONS_SUCCESS: 'LOAD_SECTIONS_SUCCESS',
    // LOAD_SECTIONS_FAILED: 'LOAD_SECTIONS_FAILED',
    
}

// @TODO make all actions like this
export const AddSectionFailed = (error) => ({
    type: SectionActionTypes.ADD_SECTION_FAILED,
    payload: { error }
});

export const expandSection = (id) => ({
    type: SectionActionTypes.EXPAND_SECTION,
    payload: { id }
});


export const collapseSection = (id) => ({
    type: SectionActionTypes.COLLAPSE_SECTION,
    payload: { id }
});

export const loadSections = () => {
    return dispatch => {
        dispatch({
            type: SectionActionTypes.LOAD_SECTIONS_REQUEST
        })
        getSectionListDB()
            .then(sections => {
                dispatch({
                    type: SectionActionTypes.LOAD_SECTIONS_SUCCESS,
                    payload: sections.val()
                });
            })
            .catch(error => {
                dispatch({
                    type: SectionActionTypes.LOAD_SECTIONS_FAILED,
                    payload: error
                });
            });
    }
}

export const createSection = (name) => {
    return dispatch => {
        dispatch({
            type: SectionActionTypes.ADD_SECTION_REQUEST
        })
        addSection(name)
            .then(res => {
                loadSections()(dispatch);
                dispatch({
                    type: SectionActionTypes.ADD_SECTION_SUCCESS,
                });
            })
            .catch(error => {
                dispatch({
                    type: SectionActionTypes.ADD_SECTION_FAILED,
                    payload: error
                });
            });

    }
}

export const createTask = (sectionId, name) => {
    return dispatch => {
        dispatch({
            type: SectionActionTypes.ADD_TASK_REQUEST
        })
        addTask(sectionId, name)
            .then(res => {
                loadSections()(dispatch);
                dispatch({
                    type: SectionActionTypes.ADD_TASK_SUCCESS,
                });
            })
            .catch(error => {
                dispatch({
                    type: SectionActionTypes.ADD_TASK_FAILED,
                    payload: error
                });
            });
    }
}

