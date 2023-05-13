import React from 'react'
const BasicCard = (props) => {
    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {/* Default box */}
                            <div className="card">
                                <div className="card-body">
                                    {props.children}
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    {props.footer}
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default BasicCard;