import React from "react";
import Axios from "axios";
import {Redirect} from 'react-router-dom';

class UpdateProduct extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            selectedProduct:{
                name:'',
                image:'',
                price:null,
                qty:'',
                info:''
            },
            isSubmited:false,
            errMessage:''
        }
    }

    componentDidMount() {
        let prodId = this.props.match.params.id;
        let dataUrl =`http://127.0.0.1:8000/api/products/${prodId}`;
        Axios.get(dataUrl).then((responce)=>{
            this.setState({
                selectedProduct:responce.data
            })
        }).catch((err)=>{
            this.setState({
                errMessage:err
            })
        })
    };

    changeInput = (event)=>{
        this.setState({
            selectedProduct :{
                ...this.state.selectedProduct,
                [event.target.name]: event.target.value
            }
        })
    };

    //changeimage
    changeImage = async (event) =>{
        let imageFiles = event.target.files[0];
        let base64Image = await this.base64Image(imageFiles);
        this.setState({
            selectedProduct :{
                ...this.state.selectedProduct,
                image:base64Image
            }
        })
    };

    //convert to base64
    base64Image = (imageFile) =>{
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener("load", ()=>{
                if (reader.result){
                    resolve(reader.result)
                }
                else {
                    reject ('Error Occured');
                }
            });
        });
    };

    submitProduct = (event) =>{
        event.preventDefault();
        let dataUrl =`http://127.0.0.1:8000/api/products/${this.state.selectedProduct._id}`;
        Axios.put(dataUrl,this.state.selectedProduct).then((responce)=>{
            this.setState({
                isSubmited:true
            })
        }).catch((err)=>{
            this.setState({
                errMessage:err
            })
        });
    };

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isSubmited ? <Redirect to='/admin'/> :
                        <div className="container mt-3">
                    <div className="row animated slideInLeft">
                        <div className="col">
                            <p className="h3 text-success">Update Product</p>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi asperiores, at culpa deserunt dicta distinctio dolore eos esse eum excepturi explicabo ipsam iste mollitia praesentium quaerat quia reprehenderit sunt?</p>
                        </div>
                    </div>
                    <div className="row animated flipInX">
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-5">
                            {/*<pre>{JSON.stringify(this.state.selectedProduct)}</pre>*/}
                            <div className="card">
                                <div className="card-header bg-secondary text-white">
                                    <p className="h4">Update Product</p>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.submitProduct}>
                                          <div className="form-group">
                                              <input
                                                  onChange={this.changeInput}
                                                  name="name"
                                                  value={this.state.selectedProduct.name }
                                                  type="text" className="form-control" placeholder="Name"/>
                                          </div>
                                        <div className="form-group">
                                            <div className="custom-file">
                                                <input
                                                    onChange={this.changeImage}
                                                    type="file" className="custom-file-input" id="customFile"/>
                                                    <label className="custom-file-label" htmlFor="customFile">Product Image</label>
                                                {
                                                    this.state.selectedProduct.image &&
                                                    <img src={this.state.selectedProduct.image} alt="" width='50' height="50" className="img-fluid "/>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                onChange={this.changeInput}
                                                name="price"
                                                value={this.state.selectedProduct.price }
                                                type="number" className="form-control" placeholder="price"/>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                onChange={this.changeInput}
                                                name="qty"
                                                value={this.state.selectedProduct.qty }
                                                type="number" className="form-control" placeholder="qty"/>
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                onChange={this.changeInput}
                                                name="info"
                                                value={this.state.selectedProduct.info }
                                                className="form-control" rows="3" placeholder="General Info"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" className="btn btn-outline-secondary btn-sm" value="Update product"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                    }
                <div style={{marginBottom:'100px'}}/>
            </React.Fragment>
        );
    }

}
export default UpdateProduct;