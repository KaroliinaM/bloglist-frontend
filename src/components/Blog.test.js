import React from 'react'
import {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe('<Blog />', ()=>{
  it('renders content', ()=> {
    const blog={
      _id: 1,
      title: "testiblogi",
      author: "testiauthor",
      url: "testiurl",
      likes: 5,
      user:{username: "user"}


    }
    const mockHandler1=jest.fn()
    const mockHandler2=jest.fn()

    let blogComponent=mount(<Blog blog={blog} whenLiked={mockHandler1} deletion={mockHandler2} poistettavissa={true} />)
    const divInfo=blogComponent.find('.hiddenContent')
    expect(divInfo.getElement().props.style).toEqual({display: 'none'})
    const link=blogComponent.find('.clickedContent')
    link.simulate('click')
    const divInfo2=blogComponent.find('.hiddenContent')
    expect(divInfo2.getElement().props.style).toEqual({display: ''})




  })
})
