import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import logo from '../../../public/leblnaccofe.png';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

export function Header(){
    
    const { signOut } = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image src={logo} alt='logo' width={90} height={100}/>
                </Link>
                <nav className={styles.menuNav}>
                    <Link href='/category'>
                        <p>Category</p>
                    </Link>
                    <Link href='/product'>
                        <p>Menu</p>
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut color='white' size={20}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}