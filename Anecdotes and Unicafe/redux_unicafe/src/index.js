import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './counterReducer'

const store=createStore(counterReducer)

const palautteet=()=>store.getState().good+store.getState().bad+store.getState().ok
const keskiarvo=()=>store.getState().good-store.getState().bad/palautteet()
const positiivisia=()=>(store.getState().good/palautteet())*100
const Statistiikka = () => {
  const palautteita = palautteet()

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>

      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia()} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e=> store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi})

  }

  render() {
    return (
      <div>
      {console.log('hei')}
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}
const renderApp = () => {ReactDOM.render(<App />, document.getElementById('root'));}
renderApp()
store.subscribe(renderApp)
