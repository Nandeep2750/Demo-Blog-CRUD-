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

export class view extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: {
                'Content-Type': 'application/json',
                'token': this.props.token,
            },
            fields: {
                iPostID: this.props.match.params.iPostID,
                vTitle: '',
                vSlug: '',
                tBody: '',
            },
        };

        this.getPostData()
    }

    getPostData = () => {
        let iPostID = this.props.match.params.iPostID

        api.post("/admin_api/blog/get_post_by_id", {
            headers: this.state.headers,
            data: { iPostID: iPostID }
        }).then(res => {
            if (res.status === 200) {
                let fields = this.state.fields 
                fields['vTitle'] =  ((res.data) ? (res.data.vTitle) : '') 
                fields['vSlug'] = ((res.data) ? (res.data.vSlug) : '')
                fields['tBody'] = ((res.data) ? (res.data.tBody) : '')
                this.setState({ fields }, () => {
                    console.log("🚀 ~ file: view.js ~ line 48 ~ view ~ this.setState ~ this.state", this.state)
                })
            } else if (res.status === 401) {
                toast.error(res.message);
                this.props.logout();
            } else {
                toast.error(res.message);
            }
        })
    }

    render() {
        return (
            <div className="container">

                <div className="mt-4 mb-3">
                    <h3 className="float-left"> View Blog Post </h3>
                    <Link to='/dashboard' class="btn btn-dark float-right"> Back </Link>
                </div>
                <div className="clearfix"></div>

                <Card style={{ width: '100%' }} className=" mx-auto mt-5">
                    <Card.Body>
                        <div className="card-block">
                            <h3 className=""> {this.state.fields.vTitle} </h3>
                            <hr/>
                            <div dangerouslySetInnerHTML={{ __html: this.state.fields.tBody }} />
                        </div>
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

export default connect(mapStateToProps, actionCreators)(view);
