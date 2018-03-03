import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification=({message, messageType})=>{
  if(message===null){
    return null
  } else if(messageType==='error'){
    return(<div className="error">{message}</div>)
  }else if (messageType==='success'){
    return (<div className="success">{message}</div>)
  }

}

const CreateForm=({handleSubmit, handleChange, title, author, url})=>{
  return (
  <div>
    <form onSubmit={handleSubmit}>
      title
      <input
        value={title}
        onChange={handleChange}
        name="title"
      /> <br />
      author
      <input
        value={author}
        onChange={handleChange}
        name="author"
      /> <br />
      url
      <input
        value={url}
        onChange={handleChange}
        name="url"
      /><br />
      <button type="submit">post</button>
    </form>
  </div>
)
}
class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      visible:false
    }
  }
  toggleVisibility=()=> {
    this.setState({visible: !this.state.visible})
  }
  render() {
    const hideWhenVisible={ display: this.state.visible ? 'none' : ''}
    const showWhenVisible={ display: this.state.visible ? '' : 'none'}
    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      blogMessage: null,
      messageType: null,
      showBlog: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON=window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user=JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }
  login= async (event)=>{
    event.preventDefault()
    try {
      const user=await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({username: '', password: '', user})
      this.setState({blogMessage: 'You are now logged in', messageType:'success'})
      setTimeout(()=>{
        this.setState({blogMessage:null, messageType:null})
      }, 5000)
    } catch (exception){
      console.log(exception)
      this.setState({blogMessage: 'login failed', messageType: 'error'})
      setTimeout(()=>{
        this.setState({blogMessage:null, messageType: null})
      }, 5000)
    }
  }
  createBlog=(event)=>{
    event.preventDefault()

    const blogObject={
      title: this.state.title,
      author:this.state.author,
      url:this.state.url
    }
    blogService
      .create(blogObject)
      .then(newBlog=> {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: ''
        })
      })
      this.setState({blogMessage: 'Blog entry added', messageType:'success'})
      setTimeout(()=>{
        this.setState({blogMessage:null, messageType:null})
      }, 5000)

  }
  logout=(event)=>{
    this.setState({user: null})
    window.localStorage.removeItem('loggedUser')
  }
  handleLoginFieldChange=(event)=>{
    this.setState({[event.target.name]: event.target.value})
  }
  handleBlogfieldChange=(event)=>{
        console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value})
  }
  toggleBlog=({id})=> {
    console.log(this.state.showBlog)
    if(this.state.showBlog===null) {
      this.setState({showBlog: id})
    } else {
      this.setState({showBlog: null})
    }
  }

  render() {
    const loginForm=()=>(
    <div>
      <h2>kirjaudu</h2>
      <form onSubmit={this.login}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  const createForm=()=>{
    return(
      <div>
      <Togglable buttonLabel="create entry">
        <CreateForm
          handleSubmit={this.createBlog}
          handleChange={this.handleBlogfieldChange}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
        />
      </Togglable>
      </div>
    )
  }
    const blogList=()=>{
      return (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>{
          return(
        <Blog key={blog._id} blog={blog} shown={this.state.showBlog} blogFunction={this.toggleBlog}/>)}
        )}
      </div>
    )}
    return (
      <div>
        <Notification message={this.state.blogMessage} messageType={this.state.messageType} />
        {this.state.user===null ?
          loginForm() :
          <div><p>{this.state.user.name} logged in <button type="submit" onClick={this.logout}>logout</button></p>
          {createForm()}
          {blogList()}
          </div>
        }
      </div>
    );
  }
}

export default App;
