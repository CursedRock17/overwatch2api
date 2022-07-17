import styles from './MainCompStyles/styles.module.css'
import Link from 'next/link'
import NavButton from './NavButton'

//Have buttons through React Router
//The login button will be connected to some form of api
//if we use google we need to store the information where the users have constant access to it


export const Navbar = () => {

    return (
        <div className={styles.NavBar}>
            <div className={styles.logo}>
                <Link href='/' className={styles.logo}> FillARole </Link>
            </div>
           <div className={styles.NavGrid}>
                   <NavButton title="Account"/>
                   <NavButton title="Search"/>
            </div>
        </div>
    )
}


export default Navbar;
