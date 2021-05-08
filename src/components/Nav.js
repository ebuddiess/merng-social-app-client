import React, { useState , useEffect , useContext} from 'react'
import { Menu , Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth'




const MenuExampleSecondaryPointing = () => {
  const [activeItem, setactiveItem] = useState('home')
  const authCtx = useContext(AuthContext)

  useEffect(()=>{
    if(window.location.pathname==="/login"){
      setactiveItem("Login")
    }else if(window.location.pathname==="/register"){
      setactiveItem("regiser")
    }else  if(window.location.pathname==="/"){
      setactiveItem("home")
    }else  if(window.location.pathname==="/post"){
      setactiveItem("Post")
    }
    
    if(!authCtx.isAuthenticated && localStorage.getItem("token")){
      authCtx.loadUser()
      setactiveItem("Home")
    }

// eslint-disable-next-line 
  },[])

  const handleItemClick = (e, { name }) => setactiveItem(name)

  const activelink = (
       <>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='Post'
            active={activeItem === 'Post'}
            onClick={handleItemClick}
            as={Link}
            to="/post"
          />
       <Menu.Item
            name= { `Logged in as  ${authCtx.user && authCtx.user.username} `}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={()=> {authCtx.logout() ; window.location.href="/"}}
            />
          </Menu.Menu>

          </>
  )

  const guestlink = (
<>
<Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
<Menu.Item
            name='Login'
            active={activeItem === 'Login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
</>
  )

    return (
        <Segment inverted>
        <Menu inverted pointing secondary className="ui padded content" size="massive">
          { localStorage.getItem("token") ? activelink : guestlink}
        </Menu>
        </Segment>
       
    )
  
}

export default MenuExampleSecondaryPointing