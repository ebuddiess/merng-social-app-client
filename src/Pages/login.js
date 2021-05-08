
import React , {useState , useContext , useEffect}  from 'react'
import { Form  , Button , Label} from 'semantic-ui-react'
import { gql , useMutation } from '@apollo/client';
import {AuthContext} from '../context/auth';



export default function Login(props) {
    const [userData, setuserData] = useState({
        email : "",
        password : "",
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

    const [loginUser, { loading }] = useMutation(LOGIN_USER,{
        update(proxy,result){
            authCtx.login(result.data.login)
            seterros({})
            props.history.push("/")
        }, 
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            seterros(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables : userData
    })
    
    const onSubmit = (e) => { 
        e.preventDefault()
        loginUser()
    }

    
    return (
        <div>
             <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : ""} >
                <h1>LOGIN</h1>
                { errors.email && <Label basic color='red' pointing="below">
                 {errors.email}
                 </Label> }
                <Form.Input type='email' label="Your email" name='email'  placeholder="Enter email" value={userData.email} onChange={onchange} />
                { errors.password && <Label basic color='red' pointing="below">
                 {errors.password} </Label> }
                <Form.Input type='password' label="Your password" name='password' placeholder="Enter password" value={userData.password} onChange={onchange} />
                <Button type="submit" primary>LOGIN</Button>
               </Form>

        </div>
    )
}


const LOGIN_USER = gql`
mutation login(
$email : String!,
$password : String!,
){
    login(email : $email ,password : $password ){
        id 
        email ,
        createdAt,
        token,
        username
    }
}
`