import { Route, Routes } from "react-router-dom"

import styles from '../../styles/Profile.module.css'
import { useState } from "react"
import Favorites from "./Favorites"
import Plans from "./Plans"
import Logout from "./Logout"

interface IProfileProps {
    setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
}

export const Profile: React.FC<IProfileProps> = ({ setUserLogin, userId }) => {
    const [activeButton, setActiveButton] = useState<string>('')

    const handleButtonClick = (btn: string) => {
        setActiveButton(btn)
    }

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <button
                    className={`${styles.btn} ${activeButton === 'favorites' ? styles.active : ''}`}
                    onClick={() => handleButtonClick('favorites')}
                >
                    Избранное
                </button>
                <button
                    className={`${styles.btn} ${activeButton === 'plans' ? styles.active : ''}`}
                    onClick={() => handleButtonClick('plans')}
                >
                    В Планах
                </button>
                <button
                    className={`${styles.btn} ${activeButton === 'logout' ? styles.active : ''}`}
                    onClick={() => handleButtonClick('logout')}
                >
                    Выход
                </button>
            </div>
            <div className={styles.content}>
                <Routes>
                    {activeButton === 'favorites' && (
                        <Route path="/" element={<Favorites userId={userId}/>} />
                    )}
                    {activeButton === 'plans' && (
                        <Route path="/" element={<Plans userId={userId}/>} />
                    )}
                    {activeButton === 'logout' && (
                        <Route path="/" element={<Logout setUserLogin={setUserLogin}/>} />
                    )}
                </Routes>
            </div>
        </div>
    )
}
