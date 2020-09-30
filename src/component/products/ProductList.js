import React from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
class ProductList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            errMessage:''

        }

    }

    componentDidMount() {
        let dataUrl =`http://127.0.0.1:8000/api/products`;
        Axios.get(dataUrl).then((responce)=>{
            this.setState({
                product:responce.data
            })
        }).catch((err)=>{
            this.setState({
                errMessage:err
            })
        })
    };

    render() {
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <div className="row animated slideInRight">
                        <div className="col">
                             <p className="h3 text-success">Product Page</p>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet eum fuga incidunt labore, qui sit unde. Aperiam aspernatur, earum esse, eum id ipsa laudantium non numquam, odit omnis perferendis!</p>
                        </div>
                    </div>
                    <div className="row mt-3 animated slideInLeft">

                            {
                                this.state.product.length > 0 ?
                                <React.Fragment>
                                    {
                                        this.state.product.map((product)=>{
                                            return(
                                                <div className="col-md-3 mb-3">
                                                <div className="card">
                                                    <div className="card-header text-center bg-white">
                                                        <img src={product.image} alt="" width='150' height='150'/>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                Name: {product.name}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Price: &#8377;{product.price.toFixed(2)}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Qty: {product.qty} Kgs
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                </div>
                                            )
                                        })
                                    }
                                </React.Fragment>:null
                            }

                    </div>
                </div>
            </React.Fragment>
        );
    }

}
export default ProductList;