import styles from "./Paginator.module.css";
import React from "react";

const Paginator = props => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            {pages.map(p => <button key={p} className={props.currentPage === p && styles.page_active}
                                    onClick={() => {
                                        props.onPageChanged(p)
                                    }}>{p}</button>
            )}
        </div>
    )
};

export default Paginator;
