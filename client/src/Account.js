import {useState} from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function Account( {user, setUser} ) {
  const [account, setAccount] = useState(true);

  return (

    <>
      {account ? (
        <>
          <LoginForm user={user} setUser={setUser}/>
          <hr />

          <p>Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setAccount(false)}>Sign Up</button>
          </p>
        </>
      ) :(
        <>
          <SignupForm user={user} setUser={setUser}/>
          <hr />
          <p>
            Already have an account? &nbsp;
            <button color="secondary" onClick={() => setAccount(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </>
  )
}

export default Account;