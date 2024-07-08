import { useState, FormEvent, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Home.module.scss';

import logo from '../../../public/leblnaccofe.png';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { AuthContext } from '../../contexts/AuthContext';

import Link from 'next/link';
import { toast } from 'react-toastify';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function handleSignUp(e: FormEvent){
    e.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.warning('Fill in all fields');
      return;
    }

    setLoading(true);
    let data = {
      name,
      email,
      password
    }
    await signUp(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='logo' width={200} height={200}/>
        <div className={styles.login}>
          <h1>Create your account</h1>
          <form onSubmit={handleSignUp}>
            <Input 
              placeholder='Name' 
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              placeholder='Email' 
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder='Password' 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              loading={false}
            >
              SIGN UP
            </Button>  
          </form>
          <Link href='/' passHref>
            <p className={styles.text}>Already have an account? Sign in now!</p>
          </Link>
        </div>
      </div>
    </>
  );
}
