import { useState } from 'react'
import Header from './components/header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Data from './components/Data/Data'
import { auth, provider } from './components/firebase/firebase';
import { signInWithPopup } from 'firebase/auth';


function App() {

  const [user, setuser] = useState(null);

// const signIn=()=>{
//   auth.signInWithPopup(provider).then(({user})=>{
//     setuser(user)
//   }).catch(error=>{
//     alert(error.message);
//   })
// }


  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      setuser( result.user);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <>
      {
        user ? (
          <>
            <Header  photoURL ={user.photoURL}/>
            <div className='App'>
              <Sidebar />
              <Data />
            </div>
          </>
        ):
        (
          <div className='loginWrap'>
            <img src ="https://logowik.com/content/uploads/images/google-drive-new1266.jpg" />
            <button onClick={signIn}>Login to google Drive Clone</button>
            
          </div>
        )
    }

    </>
  )
}

export default App