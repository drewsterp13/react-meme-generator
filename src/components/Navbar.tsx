import { Link } from "react-router-dom"
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, Providers } from "../config/firebase"

export default function Navbar() {
  const signOutOnClick = () => {
    signOut(auth)
    location.reload();
    console.log("RELOAD")
  }

  const signInOnClick = async () => {
    const response = await signInWithPopup(auth, Providers.google);
    if ( response.user ) {
      location.reload();
      console.log("RELOAD")
    }
  }

  return (
    <nav className="flex flex-row bg-yellow-500 justify-between">
      <h1 className="font-bold text-3xl">Meme Generator Data Management</h1>
      <div>
        <Link className="pr-1" to="/">HOME</Link>
        <Link className="pr-1" to="/info">INFO</Link>
        <Link className="pr-1" to="/dashboard">DASHBOARD</Link>
        <Link className="pr-1 text-blue-700 font-bold" to="/" onClick={ () => { signInOnClick()}}>LOG IN</Link>
        <Link className="pr-1 text-red-700 font-bold" to="/" onClick={ () => { signOutOnClick()}}>SIGN OUT</Link>
      </div>
    </nav>
  )
}
