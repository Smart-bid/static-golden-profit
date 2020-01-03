import React from 'react'
import moment from 'moment'

const Header = (props) => {

    let languageManager = props.languageManager();
    const today = new Date();

    return (
        <header className='Header'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="grey_title">
                            <p>{languageManager.header_title}</p>
                            <p><span>{languageManager.header_subtitle} <strong>{moment(today).format("DD/MM/YYYY")}</strong></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};
export default Header;
