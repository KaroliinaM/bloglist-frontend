import React from 'react'

class ToggleBlog extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showAll:false
    }
  }
  toggleVisibility=()=>{
    console.log(this.state.showAll)
    console.log(this.props.children.props.children)
    this.setState({showAll: !this.state.showAll})
  }
  render() {
    const hideWhenVisible={display: this.state.visible ? 'none' : ''}
    const showWhenVisible={display: this.state.visible ? '' : 'none'}
    console.log(hideWhenVisible)
    console.log(showWhenVisible)

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={this.toggleVisibility}>{this.props.linkText}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={this.toggleVisibility}>piilota</button>

      </div>
    </div>
  )
}
}
const Blog = ({blog}) => {
  return (
<div>
  <ToggleBlog linkText="testi">
     <p>rivi tekstiä</p>
  </ToggleBlog>
  </div>
)
}

export default Blog


${blog.title} ${blog.author}
`<br /> ${blog.url} <br /> ${blog.likes} <button onClick={()=>console.log('add like')`
