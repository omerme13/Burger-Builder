import React from 'react';

const icon = props => (
    <>  
        <ion-icon 
            name={props.name} 
            onClick={props.clicked}
            className={props.className}>
        </ion-icon>
    </>
);

export default icon;