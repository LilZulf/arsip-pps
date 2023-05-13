import React from 'react';

const Modal = ({ title, children, footerButtons,id }) => {
    return (
        <div className="modal fade" id={id}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    {footerButtons && (
                        <div className="modal-footer justify-content-between">
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            {footerButtons.map(({ label, className, onClick }, index) => (
                                <button key={index} type="button" className={className} onClick={onClick}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;