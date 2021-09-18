import React, { Component } from 'react'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { Route } from 'react-router'
import LazyLoader from '@loadable/component'
import { connect } from 'react-redux';

// import {BASENAME} from '../config/constants'

// Layouts
import GuestLayout from '../layout/GuestLayout';
import AdminLayout from '../layout/AdminLayout';
import Loader from './Loader'

// Pages
const Login = LazyLoader(() => import('../module/auth/login'), { fallback: <Loader/> })

const Dashboard = LazyLoader(() => import('../module/blog/dashboard'), { fallback: <Loader/> })
const Add = LazyLoader(() => import('../module/blog/add'), { fallback: <Loader/> })
const Edit = LazyLoader(() => import('../module/blog/edit'), { fallback: <Loader/> })
const View = LazyLoader(() => import('../module/blog/view'), { fallback: <Loader/> })

class Main extends Component {

    componentDidMount () {
    }

    render() {

        const GuestRoute = ({ component: Component, ...rest }) => {
            return (
                <GuestLayout>
                    <Route {...rest} render={props => (
                        // <Component {...props} />
                        this.props.loggedIn ? <Redirect to='/dashboard' /> : <Component {...props} /> 
                    )} />
                </GuestLayout>
            )
        }

        const AdminRoute = ({ component: Component, ...rest }) => {
            return (
                <AdminLayout>
                    <Route {...rest} render={props => (
                        // <Component {...props} />
                        this.props.loggedIn ? <Component {...props} /> : <Redirect to='/' />
                    )} />
                </AdminLayout>
            )
        }


        return (
            <div>
                <Switch>
                    <GuestRoute exact={true} path='/' component={Login} />

                    <AdminRoute exact={true} path='/dashboard' component={Dashboard} />
                    <AdminRoute exact={true} path='/add' component={Add} />
                    <AdminRoute exact={true} path='/edit/:iPostID' component={Edit} />
                    <AdminRoute exact={true} path='/view/:iPostID' component={View} />
                    

                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { loggedIn: state.authentication.loggedIn }
}

export default connect(mapStateToProps, null)(Main);


