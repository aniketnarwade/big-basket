import React from "react";
import Axios from "axios";
import {Redirect} from "react-router-dom";

class CreateProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            product:{
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

    changeInput = (event)=>{
      this.setState({
          product :{
              ...this.state.product,
              [event.target.name]: event.target.value
          }
      })
    };

    //changeimage
    changeImage = async (event) =>{
        let imageFiles = event.target.files[0];
        let base64Image = await this.base64Image(imageFiles);
        this.setState({
            product :{
                ...this.state.product,
                image:base64Image
            },
            isSubmited:false,
            errMessage:''
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

    submitProduct = (event) => {
        event.preventDefault();
        let dataUrl = 'http://127.0.0.1:8000/api/products/';
        Axios.post(dataUrl,this.state.product).then((responce)=>{
            this.setState({
                isSubmited: true
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
                {
                    this.state.isSubmited ?
                        <Redirect to="/admin"/> :
                        <div className="container mt-3 ">
                            <div className="row animated slideInRight">
                                <div className="col">
                                    <p className="h3 text-success">Create a product</p>
                                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                                        culpa debitis eius ex excepturi harum impedit inventore iusto laudantium, magnam
                                        odio officia qui reiciendis rem suscipit ullam voluptatem! Aliquam,
                                        voluptates?</p>

                                </div>
                            </div>

                            <div className="row animated flipInX delay-1s ">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="card ">
                                        <div className="card-header bg-dark text-white">
                                            <p className="h4">Create Product</p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.submitProduct}>
                                                <div className="form-group">
                                                    <input required
                                                           name="name"
                                                           value={this.state.product.name}
                                                           onChange={this.changeInput}
                                                           type="text" className="form-control"
                                                           placeholder="Product Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-file">
                                                        <input required

                                                               onChange={this.changeImage}
                                                               type="file" className="custom-file-input"
                                                               id="customFile"/>
                                                        <label className="custom-file-label" htmlFor="customFile">Product
                                                            Image</label>
                                                        {
                                                            this.state.product.image &&
                                                            <img src={this.state.product.image} alt="" width='50'
                                                                 height='50'
                                                                 className="img-thumbnail img-fluid text-center"/>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input required
                                                           name="price"
                                                           value={this.state.product.price}
                                                           onChange={this.changeInput}
                                                           type="number" className="form-control" placeholder="Price"/>
                                                </div>
                                                <div className="form-group">
                                                    <input required
                                                           name="qty"
                                                           value={this.state.product.qty}
                                                           onChange={this.changeInput}
                                                           type="number" className="form-control"
                                                           placeholder="Available Qty"/>
                                                </div>
                                                <div className="form-group">
                                            <textarea required
                                                      name="info"
                                                      value={this.state.product.info}
                                                      onChange={this.changeInput}
                                                      id="" cols="30" rows="3" placeholder="Genaral Info. "
                                                      className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" className="btn btn-sm btn-outline-dark"
                                                           value="Create Product"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                <div style={{marginBottom:'100px'}}>

                </div>
            </React.Fragment>
        );
    }

}
export default CreateProduct;