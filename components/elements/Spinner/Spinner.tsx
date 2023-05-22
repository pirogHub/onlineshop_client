import { FC } from 'react'

import styles from './Spinner.module.scss'

const Spinner = ({ style }: { style?: any }) => {
  if (style) return <div className={styles.spinner} />
  else return <div style={style} className={styles.spinner} />
}

export default Spinner
