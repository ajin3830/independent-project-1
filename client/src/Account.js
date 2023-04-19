import {useState} from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import {BsPersonX} from 'react-icons/bs';
import {IoIosUnlock} from 'react-icons/io';


function Account( {user, setUser} ) {
  const [account, setAccount] = useState(true);


  return (
    <>
      {user ? 
      <>
        <div className='justify-center flex py-10'>
          <BsPersonX className='text-3xl'/>
          <p className='font-normal md:font-bold'>DELETE ACCOUNT</p>
        </div>
        <div className='justify-center flex py-10'>
          <IoIosUnlock className='text-3xl'/>
          <p className='font-normal md:font-bold'>CHANGE PASSWORD</p>
        </div>
      </>
      :
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
      }
    </>
  )
}

export default Account;