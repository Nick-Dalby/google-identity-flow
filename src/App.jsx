import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState({})

  function handleCredentialResponse(response) {
    const userObject = jwtDecode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('signInDiv').hidden = true
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    })
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    })
    google.accounts.id.prompt()
  }, [])

  function handleSignOut(e) {
    e.preventDefault()

    setUser({})
    document.getElementById('signInDiv').hidden = false
  }

  return (
    <div className="App">
      <div id="signInDiv"></div>

      {user && (
        <div>
          <img src={user.picture} alt="" />
          <h2>{user.name}</h2>
        </div>
      )}

      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign out</button>
      )}
    </div>
  )
}

export default App
