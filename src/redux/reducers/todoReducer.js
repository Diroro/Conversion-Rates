import { SectionActionTypes } from "../actions/todoActions";

const initialState = {
    sections: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SectionActionTypes.LOAD_SECTIONS_SUCCESS:
            const newSections = action.payload;
            Object.keys(newSections).forEach((sectionId) => {
                const existedSec = state.sections[sectionId];
                newSections[sectionId].expanded = existedSec ? existedSec.expanded : false;
            })
            return {
                ...state,
                sections: {...newSections}
            }
        case SectionActionTypes.EXPAND_SECTION:
            const { id } = action.payload;
            const sections = state.sections;
            sections[id].expanded = true;
            
            return {
                ...state,
                sections
            };
            

        case SectionActionTypes.COLLAPSE_SECTION:
            const { id: sectionId } = action.payload;
            const allSections = { ...state.sections };
            allSections[sectionId].expanded = false;
            return {
                ...state,
                sections: allSections
            };

        default:
            return state;
    }
}

export const selectIds = (state) => {
    return Object.keys(state.sections);
}