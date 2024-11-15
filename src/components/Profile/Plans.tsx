import { useEffect, useState } from "react"
import { IProfilePages } from "../../types/types"
import SearchItem from "../SearchItem"
import styles from '../../styles/ProfilePages.module.css'


interface IPlansProps {
    userId: string
}

const Plans: React.FC<IPlansProps> = ({ userId }) => {
    const [inPlans, setInPlans] = useState<IProfilePages[]>([])

    const getUserInPlans = async () => {
        const res = await fetch('/getUserInPlans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })

        const data = await res.json()

        setInPlans(data.results)
    }

    useEffect(() => {
        getUserInPlans()
    }, [])

    return (
        <div className={styles.container}>
            {inPlans.map((movie, index) =>
                <SearchItem
                    key={movie.id - index}
                    movie={movie} />
            )}
        </div>
    )
}

export default Plans