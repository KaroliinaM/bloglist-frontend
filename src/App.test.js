import React from 'react'
import {mount} from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', ()=>{
    beforeAll(()=> {
      app=mount(<App />)
    })
    it('renders no blogs when not signed in', ()=> {
      app.update()
      const blogComponents=app.find(Blog)

      expect(blogComponents.length).toBe(0)
    })
  })
  describe('when logged in', ()=> {
    beforeEach(()=>{


      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedUser', JSON.stringify(user))
      app=mount(<App />)




    })

    it('all blogs are rendered', ()=>{
      app.update()
      const blogComponents=app.find(Blog)

      expect(blogComponents.length).toEqual(blogService.blogs.length)



    })
  })
})
