import React, {useState} from 'react'
import {useDispatch } from 'react-redux'
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {

  // dispatch 
  const dispatch = useDispatch();

  // state
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  // function 
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    
    let body = {
      email : Email,
      password : Password
    }

    // redux - action 
    dispatch(loginUser(body))
    .then(response=>{
      if(response.payload.loginSuccess) {
        props.history.push('/')
      } else {
        alert('Error')
      }
    })
  }

  // view 
  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',
     width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
       onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br/>
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
