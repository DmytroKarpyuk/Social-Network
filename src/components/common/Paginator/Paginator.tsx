import styles from './Paginator.module.css';
import React, {useState} from 'react';

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    const pagesCount: number = Math.ceil(totalItemsCount / pageSize);
    const pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount: number = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber: number = portionNumber * portionSize;

    const onButtonPrev = () => {
        setPortionNumber(portionNumber - 1);
    };
    const onButtonNext = () => {
        setPortionNumber(portionNumber + 1);
    };

    return (
        <div className={styles.paginator}>
            {portionNumber === 1 ? null : <button onClick={onButtonPrev} className={styles.control_btn}>Prev</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span key={p} className={currentPage === p ? styles.page_active : undefined} onClick={() => {
                    onPageChanged(p);
                }}>{p}</span>)
            }
            {portionNumber === portionCount ? null : <button onClick={onButtonNext} className={styles.control_btn}>Next</button>}
        </div>
    );
};

export default Paginator;

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
};
