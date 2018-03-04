import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import PropTypes from 'prop-types'
import Togglable from './components/Togglable'




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
      messageType: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON=window.localStorage.getItem('loggedUser')
    console.log('mount')

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
    this.setState({[event.target.name]: event.target.value})
  }

  addLike= (blogId)=>{
    return ()=>{
    const blog=this.state.blogs.find(b=>b._id===blogId)

    const changedBlog={...blog, likes: blog.likes+1 }


    blogService.update(blogId, changedBlog)
    .then(response=>{

      return (this.setState({blogs:this.state.blogs.map(blog=>blog._id !== blogId ? blog : changedBlog)}))

    })
  }
  }
  sortBlogs=()=>{

      const sortedblogs=this.state.blogs.sort(function (a, b){
      return b.likes-a.likes
    })
        return ()=> {
    this.setState({blogs:sortedblogs})
  }
  }
  deleteBlog=(id)=> {
    return ()=>{
      blogService
        .remove(id)
        .then(response=>{
          this.setState({blogs: this.state.blogs.filter(b=>b._id!==id)})
        })
    }

  }
canBeDeleted=(blog)=>{
  if((blog.user.username===(JSON.parse(window.localStorage.getItem('loggedUser')).username))/**||(blog.user.username===undefined)**/){
    return true
  } else {
    return false
  }
}



  render() {
    this.sortBlogs()


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
        <Blog key={blog._id} blog={blog} whenLiked={this.addLike(blog._id)} deletion={this.deleteBlog(blog._id)} poistettavissa={this.canBeDeleted(blog)} />)}
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
