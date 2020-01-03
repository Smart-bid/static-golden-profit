import React from 'react'
import bbb from './img/bbb_logo.png'
import euronext from './img/euronext_logo.png'
import mcafee from './img/mcafee_logo.png'
import nasdaq from './img/nasdaq_logo.png'
import norton from './img/norton_logo.png'
import tmx from './img/tmx_logo.png'
import truste from './img/truste_logo.png'

const Partners = () => {
    return (
        <div className='Partners'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="partners-img">
                            <img src={norton} alt="" className="img-responsive"/>
                            <img src={mcafee} alt="" className="img-responsive"/>
                            <img src={truste} alt="" className="img-responsive"/>
                            <img src={bbb} alt="" className="img-responsive"/>
                            <img src={nasdaq} alt="" className="img-responsive"/>
                            <img src={euronext} alt="" className="img-responsive"/>
                            <img src={tmx} alt="" className="img-responsive"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Partners;