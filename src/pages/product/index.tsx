import { ChangeEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from '../../components/Header';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';

export default function Product(){
    
    const [imgProductUrl, setImgProductUrl] = useState('');
    const [imageProduct, setImageProduct] = useState(null);
    
    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files) return;

        const img = e.target.files[0];
        if(!img) return;
        
        if(img.type ==='image/jpeg' || img.type === 'image/png'){
            setImageProduct(img);
            setImgProductUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    return(
        <>
        <Head>
            <title>Products</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <h1>New product:</h1>
                <form className={styles.form}>
                    <label className={styles.labelBox}>
                        <span>
                            <FiUpload size={30} color="white" />
                        </span>
                        <input type="file" accept="image/png, image.jpeg" onChange={handleFile}/>
                        {imgProductUrl && (
                            <img 
                            className={styles.preview}
                            src={imgProductUrl}
                            alt="product image"
                            width={250}
                            height={250}
                            />
                        )}
                      
                    </label>
                    <select>
                        <option>
                            Bebida
                        </option>
                        <option>
                            Comida
                        </option>
                    </select>
                    <input 
                    type="text"
                    placeholder="Enter the name of the product"
                    className={styles.input}
                    />
                    <input 
                    type="text"
                    placeholder="Enter the price of the product"
                    className={styles.input}
                    />
                    <textarea 
                    placeholder="Description of the product"
                    className={styles.input}
                    />
                    <button className={styles.buttonAdd} type="submit">
                        NEW PRODUCT
                    </button>
                </form>
            </main>
        </div>        
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return{
        props: {}
    }
});