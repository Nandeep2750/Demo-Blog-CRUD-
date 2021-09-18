import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CKEditor from 'ckeditor4-react';



import { userActions } from '../../actions/user.actions'

import Api from "../../helper/Api";
const api = new Api();


export class add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: {
                'Content-Type': 'application/json',
                'token': this.props.token,
            },
            fields: {
                vTitle: '',
                vSlug: '',
                tBody: '',
            },
        };

        this.validator = new SimpleReactValidator();


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        let fields = this.state.fields;
        fields[name] = value

        this.setState({ fields });
    }

    onEditorChange = evt => {
        let fields = this.state.fields;
        fields['tBody'] = evt.editor.getData()
        this.setState({ fields });
    };



    handleSubmit(event) {
        event.preventDefault();
        if (this.validator.allValid()) {
            api.post("/admin_api/blog/add", {
                headers: this.state.headers,
                data: this.state.fields
            }).then(res => {
                if (res.status === 200) {
                    toast.success(res.message);   
                    let blank_fields =  {
                        vTitle: '',
                        vSlug: '',
                        tBody: '',
                    }
                    this.setState({ fields : blank_fields })
                    this.props.history.push('/dashboard');
                } else if(res.status === 401){
                    toast.error(res.message);        
                    this.props.logout();
                } else {
                    toast.error(res.message);        
                }
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="container">

                <div className="mt-4 mb-3">
                    <h3 className="float-left"> Add new Blog Post </h3>
                    <Link to='/dashboard' class="btn btn-dark float-right"> Back </Link>
                </div>
                <div className="clearfix"></div>

                <Card style={{ width: '100%' }} className=" mx-auto mt-5">
                    <Card.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="mrg-top-10 text-dark"> <b>Title</b> <span className="text-danger">*</span> </p>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="vTitle" value={(this.state.fields && this.state.fields.vTitle) ? (this.state.fields.vTitle) : ''} onChange={this.handleChange} />
                                        {this.validator.message('Title', this.state.fields.vTitle, 'required', { className: 'text-danger' })}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="mrg-top-10 text-dark"> <b>Slug</b> <span className="text-danger">*</span> </p>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="vSlug" value={(this.state.fields && this.state.fields.vSlug) ? (this.state.fields.vSlug.trim()) : ''} onChange={this.handleChange} />
                                        {this.validator.message('Slug', this.state.fields.vSlug, 'required', { className: 'text-danger' })}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="mrg-top-10 text-dark"> <b>Content</b> <span className="text-danger">*</span> </p>
                                    </div>
                                    <div className="col-md-9">
                                        <CKEditor   
                                            onChange = {this.onEditorChange}  
                                            data={ (this.state.fields && this.state.fields.tBody) ? (this.state.fields.tBody) : '' }
                                        />
                                        {this.validator.message('Content', this.state.fields.tBody, 'required', { className: 'text-danger' })}
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-dark float-right mt-4" value="ADD" />
                            </div>
                        </form>
                    </Card.Body>
                </Card>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.authentication.userData,
        token: state.authentication.token,
    }
}

const actionCreators = {
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(add);