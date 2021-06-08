import styles from "./Paginator.module.css";
import React, {useState} from "react";

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

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
                .map(p => <span key={p} className={currentPage === p ? styles.page_active : null} onClick={() => {
                    onPageChanged(p)
                }}>{p}</span>)
            }
            {portionNumber === portionCount ? null : <button onClick={onButtonNext} className={styles.control_btn}>Next</button>}
        </div>
    )
};

export default Paginator;
