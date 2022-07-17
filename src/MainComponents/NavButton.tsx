import Link from 'next/link';
import styles from './MainCompStyles/styles.module.css'

export const NavButton = (props:any) => {
    return (
        <div className={styles.Navbutton}>
         <Link href={`/${props.title}`} className={styles.ButtonText}>  
            <p className={styles.ButtonText}> { props.title } </p>
         </Link>
        </div>
    )
}

export default NavButton;