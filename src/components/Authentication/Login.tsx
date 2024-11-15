import { useEffect, useState } from "react"

import styles from '../../styles/Login.module.css'
import { useNavigate } from "react-router-dom"

interface ILoginResponse {
    id: string;
    message: string;
    code: number
}

interface LoginProps {
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setUserLogin, setUserName, setUserId }) => {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [login, setLogin] = useState<boolean>(false)

    const navigate = useNavigate()

    const fetchLogin = async () => {
        if (name === '' || password === '') {
            alert('Все поля должны быть заполнены')
            return
        }

        const obj = { name, password }

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data: ILoginResponse = await res.json()

        if (data.code === 400) {
            alert(data.message)
            return
        }
        setUserName(name)
        setUserId(data.id)
        setUserLogin(true)
        navigate('/')
    }

    return (
        <div className={styles.wrapper}>
            <h1>Вход</h1>
            <div className={styles.container}>
                <input type="text" onChange={e => setName(e.target.value)} className={styles.input} placeholder="Имя пользователя" />
                <input type="password" onChange={e => setPassword(e.target.value)} className={styles.input} placeholder="Пароль" />
                <button onClick={fetchLogin} className={styles.btn}>
                    <b>Вход</b>
                </button>
                <div className={styles.redirect}>
                    <p>
                        Нет аккаунта?
                        <a onClick={() => navigate('/register')}>Зарегестрироваться</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login