import { useNavigate } from 'react-router-dom'

interface ILogoutProps {
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Logout: React.FC<ILogoutProps> = ({setUserLogin}) => {
    const navigator = useNavigate()

    const toggleLogin = () => {
        setUserLogin(false)
        navigator('/')
    }
    return (
        <div onClick={toggleLogin}>Logout</div>
    )
}

export default Logout