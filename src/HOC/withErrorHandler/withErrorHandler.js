import React from 'react';
// import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (wrappedComponent) => {
    return (props) => {
        return (
            <>
                {/* <Modal></Modal> */}
                <wrappedComponent {...props} />
            </>
        );
    }
}

export default withErrorHandler;