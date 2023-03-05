import React from 'react';
import styles from './NotFoundBlock.module.scss'

function NotFoundBlock() {
    return (
        <div className={styles.root}>
           <h1>
               <span>😕</span>
               <br/>
               <p className={styles.description} >К сожалению данная страница отсутствует</p>
           </h1>
        </div>
    );
}

export default NotFoundBlock;