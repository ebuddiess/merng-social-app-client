
import { gql, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';



export default function Register(props) {
    const [userData, setuserData] = useState({
        username : "" ,
        email : "",
        password : "",
        confirmPassword : ""
    })
    const authCtx = useContext(AuthContext)

    useEffect(() => {
      if(authCtx.isAuthenticated && localStorage.getItem("token")){
        props.history.push("/")
      }
      // eslint-disable-next-line
    }, [authCtx.isAuthenticated])

    onchange = (e) =>{
        setuserData({...userData , [e.target.name]:e.target.value})
    }

    const [errors, seterros] = useState({})

    const [addUser, { loading }] = useMutation(REGISTER_USER,{
        update(proxy,result){
            console.log(result)
            seterros({})
            props.history.push("/")
        }, 
        onError(err){
            seterros(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables : userData
    })
    const onSubmit = (e) => { 
        e.preventDefault()
        console.log(userData)
        addUser()
    }

    
    return (
        <div>
             <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : ""} >
                <h1>REGISTER</h1>
                { errors.username && <Label basic color='red' pointing="below">
                 {errors.username}
                 </Label> }
                <Form.Input label="Your Name" name='username' placeholder="Enter Name" value={userData.username} onChange={onchange} />
                { errors.email && <Label basic color='red' pointing="below">
                 {errors.email}
                 </Label> }
                <Form.Input type='email' label="Your email" name='email'  placeholder="Enter email" value={userData.email} onChange={onchange} />
                { errors.password && <Label basic color='red' pointing="below">
                 {errors.password} </Label> }
                <Form.Input type='password' label="Your password" name='password' placeholder="Enter password" value={userData.password} onChange={onchange} />
                { errors.confirmpassword && <Label basic color='red' pointing="below">
                 {errors.confirmpassword} </Label> }
                <Form.Input type='password' label="Confirm password" name='confirmPassword' placeholder="Confirm password" value={userData.confirmPWD} onChange={onchange} />
                <Button type="submit" primary>REGISTER</Button>
               </Form>
        </div>
    )
}


const REGISTER_USER = gql`
mutation register(
$username : String!,
$email : String!,
$password : String!,
$confirmPassword : String!
){
    register(registerInput:{
        username : $username ,
        email : $email ,
        password : $password ,
        confirmPassword :  $confirmPassword
    }
    ){
        id 
        email ,
        createdAt,
        token
    }
}
`