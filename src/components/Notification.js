import React from 'react'

const Notification=({message, messageType})=>{
  if(message===null){
    return null
  } else if(messageType==='error'){
    return(<div className="error">{message}</div>)
  }else if (messageType==='success'){
    return (<div className="success">{message}</div>)
  }

}

export default Notification
