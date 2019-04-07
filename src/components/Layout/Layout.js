import React from 'react';
import layoutClasses from './Layout.css';

const layout = (props) => (
    <>
        <div>
            toolbar, sidedrawer, backdrop
        </div>
        <main className={layoutClasses.content}>
            {props.children}
        </main>
    </>
);

export default layout;
