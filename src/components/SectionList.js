import * as React from 'react';
import SectionItem from './SectionItem';

export default (props) => {
    return (
    <ul>
        { props.sectionIds && props.sectionIds.map((sectionId) => 
            <SectionItem sectionId={sectionId}></SectionItem>
        )}
    </ul>
)};
