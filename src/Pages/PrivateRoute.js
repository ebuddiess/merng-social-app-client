import React , {useContext} from 'react'
import {Route , Redirect} from 'react-router-dom'
import {AuthContext} from '../context/auth'




const PrivateRoute = ({ component: Component , ...rest}) => {
    const authCtx = useContext(AuthContext)

   return (
    <Route {...rest}  render = {props => 
     authCtx.user ? ( <Redirect to="/" /> ) : ( <Component {...props} />)
    } />
   )
}
    

export default PrivateRoute