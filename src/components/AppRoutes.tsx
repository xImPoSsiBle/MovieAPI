import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import MovieDetail from "./MovieDetail"
import Search from "./Search"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import { useState } from "react"
import Header from "./Header"
import { Profile } from "./Profile/Profile"

const AppRouter: React.FC = () => {
  const [userLogin, setUserLogin] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  return (
    <>
      <Header userLogin={userLogin} userName={userName} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies/:id" element={<MovieDetail userId={userId} userLogin={userLogin} />} />
          <Route path="search/movie/:value" element={<Search />} />
          <Route path="search/genre/:genre" element={<Search />} />
          <Route path="/register" element={<Register setUserLogin={setUserLogin} setUserName={setUserName} setUserId={setUserId} />} />
          <Route path="/login" element={<Login setUserLogin={setUserLogin} setUserName={setUserName} setUserId={setUserId} />} />
          <Route path="/profile" element={<Profile setUserLogin={setUserLogin} userId={userId} />} />

        </Routes>
      </div>
    </>
  )
}

export default AppRouter