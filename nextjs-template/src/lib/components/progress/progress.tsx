'use client'

import { ProgressSpinner } from 'primereact/progressspinner'
import styles from './progress.module.css'
import { BlockUI } from "primereact/blockui"

export function Progress() {
    return (
        <>
            <BlockUI blocked className={styles.bg} />
            <div className={styles.overlay}>
                <div className={styles.progress}>
                    <ProgressSpinner />
                </div>
            </div>
        </>
    )
}