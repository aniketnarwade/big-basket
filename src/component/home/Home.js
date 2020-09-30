import React from "react";

class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
                <div className="landing-page">
                    <div className="wrapper">
                        <div className="d-flex flex-column text-center justify-content-center align-items-center h-100">
                            <h2 className="display-3 animated slideInDown">
                                <i className="fa fa-shopping-cart"/> BigBasket</h2>

                            <p className="lead animated slideInUp">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut culpa cum error eveniet ex facere hic illo magnam, maxime provident quia soluta tempore temporibus vel veritatis voluptas voluptatibus. Enim, reprehenderit.</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
export default Home;