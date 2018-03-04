import React from 'react';

const getId = () => (100000*Math.random()).toFixed(0)
class App extends React.Component {
  addAnecdote=(event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW',
      data: {
        content: content,
        id: getId(),
        votes:0
      }
    })
    event.target.anecdote.value= ''
  }
  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort(function (a, b) {
      console.log('hei')
      return b.votes - a.votes;
    });
    return (
      <div>

        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e=>this.props.store.dispatch({type: 'VOTE', id: anecdote.id})}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App
