import React, {useState} from 'react'
import {useDispatch } from 'react-redux'
import { RegisterUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
function RegisterPage(props) {

  // dispatch 
  const dispatch = useDispatch();

  // state
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  // function 
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    
    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email : Email,
      name : Name,
      password : Password
    }

    // redux - action 
    dispatch(RegisterUser(body))
    .then(response=>{
      if ( response.payload.success ) {
        props.history.push("/login")
      } else {
        alert("Faild to sign up")
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',
     width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
       onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="ConfirmPassword" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br/>
        <button>회원가입</button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)
