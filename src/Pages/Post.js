
import {AuthContext} from '../context/auth'


import React , {useState , useContext , useEffect}  from 'react'
import { Form  , Button , Header , Label , Grid , GridColumn} from 'semantic-ui-react'
import { useMutation , useQuery  } from '@apollo/client';
import Posts from '../components/Posts';
import CREATE_POST from '../ApolloProvider/queries/CREATE_POST';
import FETCH_USER_POST from '../ApolloProvider/queries/FETCH_USER_POST';
import FETCH_POST_QUERY from '../ApolloProvider/queries/FETCH_POST_QUERY';





export default function Post(props) {
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        if(!authCtx.isAuthenticated && !localStorage.getItem("token")){
            props.history.push("/")
          }
          // eslint-disable-next-line
    }, [authCtx.isAuthenticated])

    const [userData, setuserData] = useState({
        post : "",
    })

    onchange = (e) =>{
        setuserData({...userData , [e.target.name]:e.target.value})
    }

    const [errors, seterrors] = useState({})
    const [info, setinfo] = useState({})

    const [createPost, { loading }] = useMutation(CREATE_POST,{
        update(proxy,result){  
        const data = proxy.readQuery({
            query : FETCH_POST_QUERY
        })

        const singledata = proxy.readQuery({
            query : FETCH_USER_POST ,
            variables: { // Provide any required variables here
                email: authCtx.user && authCtx.user.email,
              },
        })

        let newData = data.getPosts
        newData = [result.data.createPost , ...newData]
        proxy.writeQuery({query : FETCH_POST_QUERY , data : {
            getPosts:newData
        }})
        let newUserdata = singledata.getUserPosts
        newUserdata = [ result.data.createPost , ...newUserdata ]

        proxy.writeQuery({query:FETCH_USER_POST,data: {
            getUserPosts : newUserdata
        },variables:{ // Provide any required variables here
            email: authCtx.user && authCtx.user.email,
          },})

        setinfo({info:"Post created Succesfully"})
        setTimeout(()=> setinfo({}),1000)
        }, 
        onError(err){
            console.log(err)
        },
        variables : { body : userData.post}
    })

    const {data } = useQuery(FETCH_USER_POST,{
        variables : {email : authCtx.user ? authCtx.user.email : ""}
    })

    const onSubmit = (e) => { 
        e.preventDefault()
        //createPost()
        if(userData.post.trim()===''){
            seterrors({blank : "POST CANT BE BLANK"})
        }else{
            seterrors({})
            createPost()
        }
       
    }

    
    
    return (
        <Grid columns={2} relaxed='very' stackable>
        <GridColumn>
            { info.info && <Header  style={{padding:"20px" , border : "2px solid "}} basic color='blue' size='massive' textAlign='center'>
                 {info.info} 
                 </Header>}
             <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : ""} >
             <Header as='h2' icon textAlign='center'>
              <Header.Content>CREATE A POST</Header.Content>
             </Header>
              { errors.blank && <Label basic color='red' pointing="below">
                 {errors.blank}
                 </Label> }
                <Form.Input type='textarea' label="" name='post'  placeholder="Whats in your mind ?" value={userData.post} onChange={onchange} />
                <Button type="submit" primary>CREATE</Button>
               </Form>
        </GridColumn>
        <GridColumn columns={2} divided>
            <div className="wrapper" style={{padding:"10px",height:"50rem",overflowY:"scroll"}}> { !data ? (<h1>Loading Posts</h1>) : (<Posts posts={data.getUserPosts} />) }</div>
        </GridColumn>
        </Grid>
       
    )
}


