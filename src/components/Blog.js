import React from 'react'

class ToggleBlog extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showAll:false
    }
  }
  toggleVisibility=()=>{
    this.setState({showAll: !this.state.showAll})
  }
  render() {
    const hideWhenVisible={display: this.state.showAll ? 'none' : ''}
    const showWhenVisible={display: this.state.showAll ? '' : 'none'}

  return (
    <div>
      <div style={hideWhenVisible}>
        <div onClick={this.toggleVisibility} className="clickedContent" >{this.props.linkText} </div>
      </div>
      <div style={showWhenVisible} className="hiddenContent">
        <div onClick={this.toggleVisibility}>{this.props.linkText}</div>
        {this.props.children}

      </div>
    </div>
  )
}
}
const Blog = ({blog, whenLiked, deletion, poistettavissa}) => {

  const showDeletion={display: poistettavissa ? '' : 'none' }


  return (
<div>

  <ToggleBlog linkText={blog.title+ " " +blog.author} >
  <div> {blog.url} <br /> {blog.likes}<button onClick={whenLiked} value={blog._id} >like</button> <br />
  <div style={showDeletion}><button onClick={deletion}>delete</button></div></div>
  </ToggleBlog>

  </div>
)
}

export default Blog
