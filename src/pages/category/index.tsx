import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from '../../components/Header';
import styles from './styles.module.scss';

import { setupAPIClient } from '../../services/api';
import { toast } from "react-toastify";

import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category(){
    
    const [name, setName] = useState('');

    async function handleRegister(e: FormEvent){
        e.preventDefault();
        
        if(name === '') return;

        const api = setupAPIClient();
        await api.post('/category', {
            name: name
        });

        toast.success('Category created!');

        setName('');
    }
    
    return(
        <>
        <Head>
            <title>New category</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <h1>Register category:</h1>
                <form className={styles.form} onSubmit={handleRegister}> 
                    <input 
                    type="text" 
                    placeholder="Enter the name of the category"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className={styles.buttonAdd}>
                    NEW CATEGORY
                    </button>
                </form>
                
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {


    return {
        props: {}
    }
});