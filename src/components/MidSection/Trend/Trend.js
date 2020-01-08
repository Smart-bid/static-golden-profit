import React from 'react'


const Trend = props => {
    let languageManager = props.languageManager();
    return (
        <div className="Trend">
            <div className="trend-block">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="trade-title">{languageManager.trade_title}</h2>
                            <h3 className="trade-description">{languageManager.trade_description}</h3>
                            <div className="picture-block">
                                <div className="picture-date">
                                    <p className="year start">1999</p>
                                    <p className="year end">2020</p>
                                </div>
                                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="3 0 245.52 96.56">
                                    <defs>
                                        <clipPath id="clip-path" transform="translate(0 -3.53)">
                                            <rect className="cls-1" x="1.25" width="100%" height="98.04"></rect>
                                        </clipPath>
                                    </defs>
                                    <title>gold_chart</title>
                                    <g>
                                        <g id="chart">
                                            <g className="cls-2">
                                                <polygon id="chart_shape" className="cls-3"
                                                         points="251.27 25.28 243.55 34.64 234.28 26.96 225.78 30.92 218.44 37.16 215.74 26.48 210.72 31.76 208.02 40.52 199.52 36.92 188.32 27.44 177.51 31.04 174.03 16.52 168.63 5.24 163.54 14 157.04 7.76 151.63 0.56 147.39 15.8 145.84 20.72 138.12 27.32 133.48 38.12 127.69 44.84 120.42 50.85 118.42 60.69 115.33 53.49 108.38 50.73 105.29 44.84 98.73 62.13 93.71 62.85 90.23 65.13 83.67 63.57 77.49 70.17 70.54 75.69 62.04 75.69 56.25 77.49 52 76.53 43.12 80.73 38.1 80.73 25.74 83.25 14.93 84.69 0.25 83.25 0.25 96.56 251.27 96.56 251.27 25.28"></polygon>
                                                <polyline vectorEffect="non-scaling-stroke" id="chart_line"
                                                          className="cls-4"
                                                          points="0.25 83.25 14.93 84.69 25.74 83.25 38.1 80.73 43.12 80.73 52 76.53 56.25 77.49 62.04 75.69 70.54 75.69 77.49 70.17 83.67 63.57 90.23 65.13 93.71 62.85 98.73 62.13 105.29 44.84 108.38 50.73 115.33 53.49 118.42 60.69 120.42 50.85 127.69 44.84 133.48 38.12 138.12 27.32 145.84 20.72 147.39 15.8 151.63 0.56 157.04 7.76 163.54 14 168.63 5.24 174.03 16.52 177.51 31.04 188.32 27.44 199.52 36.92 208.02 40.52 210.72 31.76 215.74 26.48 218.44 37.16 225.78 30.92 234.28 26.96 243.55 34.64 251.27 25.28"></polyline>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Trend;