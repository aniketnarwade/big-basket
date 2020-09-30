import React from "react";
import {Link} from "react-router-dom";
import Axios from "axios";


class ProductAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            errMessage:''

        }
    };

    componentDidMount() {
       this.getProduct();
    };

    //get all product
    getProduct = () => {
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

    //delete product
    deleteProduct = (productId) => {
    let dataUrl = `http://127.0.0.1:8000/api/products/${productId}`;
    Axios.delete(dataUrl).then(()=>{
        this.getProduct();
    }).catch((err)=>{
        this.setState({
            errMessage:err
        })
    });
    };


    render() {
        return (
            <React.Fragment>
                <div className="container mt-3">
                <div className="row animated slideInLeft">
                    <div className="col">
                        <p className="h3 text-success">Product Details</p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet eum fuga incidunt labore, qui sit unde. Aperiam aspernatur, earum esse, eum id ipsa laudantium non numquam, odit omnis perferendis!</p>
                        <Link to="/create-product" className="btn btn-outline-success btn-sm">Create Product</Link>
                    </div>
                </div>
                    <div className="row mt-3 animated zoomIn ">
                        <div className="col">
                            <table className="table table-hover text-center table-striped table-success">
                                <thead className="bg-dark text-white">
                                <tr>

                                    <th>SNO</th>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.product.length > 0 ?
                                        <React.Fragment>
                                            {
                                                this.state.product.map((product)=>{
                                                    return(
                                                        <tr>
                                                            <td>{product._id.substr(product._id.length-4)}</td>
                                                            <td>
                                                                <img src={product.image} alt="" width='70' height='70'/>
                                                            </td>
                                                            <td>{product.name}</td>
                                                            <td>&#8377;{product.price.toFixed(2)}</td>
                                                            <td>{product.qty} Kgs</td>
                                                            <td>
                                                                <Link to={`/update-product/${product._id}`} className="btn btn-sm btn-secondary text-white">Update</Link>
                                                                <button className="btn btn-sm btn-danger text-white" onClick={this.deleteProduct.bind(this,product._id)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </React.Fragment>:
                                        <React.Fragment>
                                            <tr>
                                                <td colSpan="6" className="text-danger font-weight-bold">---------- No Products Available------------</td>
                                            </tr>
                                        </React.Fragment>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            </React.Fragment>
        );
    }

}
export default ProductAdmin;