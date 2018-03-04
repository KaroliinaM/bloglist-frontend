const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let changedstate
  let value
  switch (action.type) {
    case 'GOOD':

      changedstate={...state, good: state.good+1}
      return changedstate
    case 'OK':
    changedstate={...state, ok: state.ok+1}
    return changedstate
    case 'BAD':
    changedstate={...state, bad: state.bad+1}
    return changedstate
    case 'ZERO':
      return initialState
  }
  return state
}

export default counterReducer
