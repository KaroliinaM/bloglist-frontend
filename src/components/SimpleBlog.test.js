import React from 'react'
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', ()=> {
  const blog={
    title: "testititle",
    author: "testikirjailija",
    likes: 5
  }
  const mockHandler=jest.fn()
  let blogComponent
  beforeEach(()=>{
    blogComponent=shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })
  it('renders title', ()=> {
    const contentDiv=blogComponent.find('.title')

    expect(contentDiv.text()).toContain(blog.title)
  })
  it('renders author', ()=> {
    expect(blogComponent.find('.author').text()).toContain(blog.author)
  })
  it('renders likes', ()=> {
    expect(blogComponent.find('.likes').text()).toContain(`blog has ${blog.likes} likes`)
  })
  it('clicking the button calls event handler', ()=> {
    const button=blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
