import React from 'react'
import { useContext, FormEvent } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';

import logo from '../../public/leblnaccofe.png';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import Link from 'next/link';

import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleLogin(e: FormEvent){
    e.preventDefault();
    
    if(email === '' || password === ''){
      toast.warning('Fill in all fields');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Café LeBlanc</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='logo' width={200} height={200}/>
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              placeholder='Your email' 
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder='Your password' 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              loading={loading}
            >
              ACCESS
            </Button>  
          </form>
          <Link href='/signup' passHref>
            <p className={styles.text}>Don't have an account? Create one now!</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {}
  }
});
