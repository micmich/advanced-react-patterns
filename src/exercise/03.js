// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext

const ToggleContext = React.createContext({});
ToggleContext.displayName = 'ToggleContext';

function useToggle() {
  const { on, toggle } = React.useContext(ToggleContext);
  if (typeof on === 'undefined') {
    throw new Error("Missing ToggleContext - wrap component in <Toggle /> parent.")
  }
  return {on, toggle}
}

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return <ToggleContext.Provider value={{on, toggle}} >{children}</ToggleContext.Provider>
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = React.useContext(ToggleContext)`
// 📜 https://react.dev/reference/react/useContext
function ToggleOn({children}) {
  return useToggle().on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  return useToggle().on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {
  const {on, toggle} = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />
}

const App = () => <Toggle><ToggleButton /></Toggle>

export default App

/*
eslint
  no-unused-vars: "off",
*/
