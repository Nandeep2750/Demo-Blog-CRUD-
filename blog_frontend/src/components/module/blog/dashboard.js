import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { userActions } from '../../actions/user.actions'

import Api from "../../helper/Api";
const api = new Api();

export class dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: {
                'Content-Type': 'application/json',
                'token': this.props.token,
            },
            blog_list: [],
        };

    }

    componentDidMount() {
        this.getBloglist()
    }

    getBloglist = () => {
        api.post("/admin_api/blog/list", {
            headers: this.state.headers,
            data: { search: this.state.search }
        }).then(res => {
            if (res.status === 200) {
                this.setState({ blog_list: ((res.data) ? (res.data) : {}) }, () => {
                    console.log("🚀 ~ file: dashboard.js ~ line 38 ~ dashboard ~ this.setState ~ this.state", this.state.blog_list)
                })
            } else if (res.status === 401) {
                toast.error(res.message);
                this.props.logout();
            } else {
                toast.error(res.message);
            }
        })
    }

    handleChangeStatus = (postData) => {
        api.post("/admin_api/blog/change_post_status", {
            headers: this.state.headers,
            data: {
                iPostID: postData.iPostID,
            }
        }).then(res => {
            if (res.status === 200) {
                this.getBloglist()
                toast.success(res.message);
            } else if (res.status === 401) {
                toast.error(res.message);
                this.props.logout();
            } else {
                toast.error(res.message);
            }
        })
    }

    deleteSubAdmin = (iPostID) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                api.post("/admin_api/blog/delete", {
                    headers: this.state.headers,
                    data: { iPostID: iPostID }
                }).then(res => {
                    if (res.status === 200) {
                        this.getBloglist()
                        toast.success(res.message);
                    } else if (res.status === 401) {
                        toast.error(res.message);
                        this.props.logout();
                    } else {
                        toast.error(res.message);
                    }
                })
            } else {
                // swal("Your data is safe!");
            }
        });
    }

    render() {
        const data = this.state.blog_list
        const columns = [
            {
                Header: 'Title',
                accessor: 'vTitle',
                sortable: true,
                className: 'my-auto text-center',
            },
            {
                Header: 'Slug',
                accessor: 'vSlug',
                sortable: true,
                className: 'my-auto text-center',
            },
            {
                Header: 'Status',
                accessor: 'isActive',
                sortable: true,
                className: 'my-auto text-center',
                Cell: (row) => {
                    let button_class = ''
                    let button_text = ''
                    if (row.original.isActive == 1) {
                        button_class = 'btn-success'
                        button_text = 'Active'
                    } else {
                        button_class = 'btn-danger'
                        button_text = 'Inactive'
                    }
                    return (
                        <button className={"btn m-auto " + button_class} onClick={() => this.handleChangeStatus(row.original)}>
                            { button_text}
                        </button>
                    )
                }
            },
            {
                Header: 'Action',
                accessor: 'iPostID',
                sortable: true,
                className: 'text-center',
                Cell: (row) => {
                    return (<div>
                        <Link to={`/view/${row.original.iPostID}`} className="btn btn-info my-2 mx-2" >
                            View
                        </Link>
                        <Link to={`/edit/${row.original.iPostID}`} className="btn btn-primary my-2 mx-2" >
                            Edit
                        </Link>
                        <button className="btn btn-danger my-2 mx-2" onClick={() => this.deleteSubAdmin(row.original.iPostID)}  >
                            Delete
                        </button>
                    </div>)
                }
            },
        ];

        return (
            <div className="container">

                <div className="mt-4 mb-3">
                    <h3 className=" float-left"> Blog post list </h3>
                    <Link to='/add' class="btn btn-dark float-right"> Add Post </Link>
                </div>
                <div className="clearfix"></div>

                <ReactTable
                    minRows={(this.state.blog_list.length < 10) ? this.state.blog_list.length : 0}
                    searching={true}
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight mt-3"
                    globalFilter={true}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.authentication.userData,
        loggedIn: state.authentication.loggedIn,
        token: state.authentication.token,
    }
}

const actionCreators = {
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(dashboard);