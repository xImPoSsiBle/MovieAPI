import { useEffect, useState } from 'react'

import image from '../images/search-icon.png'
import styles from '../styles/Header.module.css'
import { useNavigate } from 'react-router-dom'

interface ILoginProps {
  userLogin: boolean;
  userName: string;
}

const Header: React.FC<ILoginProps> = ({ userLogin, userName }) => {
  const [value, setValue] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const navigate = useNavigate()

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`search/movie/${value}`)
    }
  }

  const redirectLoginPage = () => {
    navigate('/login')
  }

  const redirectHomePage = () => {
    navigate('/profile')
  }

  useEffect(() => {
    if (userName !== '') {
      setName(userName)
    }

    setIsLogin(userLogin)
  }, [userLogin, userName])

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          MovieAPI
        </div>
        <div className={styles.inputDiv}>
          <img src={image} alt="search" className={styles.searchIcon} />
          <input type="text" className={styles.searchInput} value={value} onChange={inputHandler} placeholder='Поиск...' onKeyDown={keyDownHandler} />
        </div>
        <div className={styles.user}>
          {isLogin ? <h3 onClick={redirectHomePage}>{name}</h3> : <button onClick={redirectLoginPage} className={styles.loginBtn}>Войти</button>}
        </div>
      </div>
    </header>
  )
}

export default Header