import { useState } from 'react'

import styles from '../../styles/Login.module.css'
import { useNavigate } from 'react-router-dom'

interface IRegisterResponse {
    id: string;
    message: string;
    code: number;
}

interface RegisterProps {
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Register: React.FC<RegisterProps> = ({ setUserLogin, setUserName, setUserId }) => {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')

    const navigate = useNavigate()

    const fetchSignUp = async () => {
        if (name === '' || password === '' || confirmPass === '') {
            return alert('Все поля должны быть заполнены')
        }

        if (password !== confirmPass) {
            return alert('Пароли не совпадают')
        }

        const obj = { name, password }

        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data: IRegisterResponse = await res.json()

        if (data.code === 400) {
            return alert(data.message)
        }

        setUserName(name)
        setUserId(data.id)
        setUserLogin(true)
        navigate('/')
    }

    return (
        <div className={styles.wrapper}>
            <h1>Регистрация</h1>
            <div className={styles.container}>
                <input type="text" onChange={e => setName(e.target.value)} className={styles.input} placeholder="Имя пользователя" />
                <input type="password" onChange={e => setPassword(e.target.value)} className={styles.input} placeholder="Пароль" />
                <input type="password" onChange={e => setConfirmPass(e.target.value)} className={styles.input} placeholder="Подтверждение пароля" />
                <button onClick={fetchSignUp} className={styles.btn}>
                    <b>Зарегестрироваться</b>
                </button>
            </div>
        </div>
    )
}

export default Register