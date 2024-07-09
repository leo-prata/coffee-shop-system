import { ChangeEvent, FormEvent, use, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from '../../components/Header';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';

import { setupAPIClient } from '../../services/api';
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
}

type CategoryProps = {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    
    const [imgProductUrl, setImgProductUrl] = useState('');
    const [imageProduct, setImageProduct] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelect, setCategorySelect] = useState(0);
    
    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files) return;

        const img = e.target.files[0];
        if(!img) return;
        
        if(img.type === 'image/jpeg' || img.type === 'image/png'){
            setImageProduct(img);
            setImgProductUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>){
        setCategorySelect(Number(e.target.value));
    }

    async function handleSubmit(e: FormEvent){
        e.preventDefault();

        try{
            const data = new FormData();
            if(name === '' || price === '' || description === '' || imageProduct === null){
                toast.warning('fill all fields');
                return;
            }    

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelect].id);
            data.append('file', imageProduct);

            const api = setupAPIClient();
            await api.post('/product', data);
            toast.success('Product registered'); 
        }catch(e){
            toast.error('error');
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageProduct(null);
        setImgProductUrl('');
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
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.labelBox}>
                        <span>
                            <FiUpload size={30} color="white" />
                        </span>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>
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
                    <select value={categorySelect} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return(
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                    <input 
                    type="text"
                    placeholder="Enter the name of the product"
                    className={styles.input}
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                    />
                    <input 
                    type="text"
                    placeholder="Enter the price of the product"
                    className={styles.input}
                    value={price}
                    onChange={(e) => {setPrice(e.target.value)}}
                    />
                    <textarea 
                    placeholder="Description of the product"
                    className={styles.input}
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
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
    const api = setupAPIClient(context);

    const response = await api.get('/category');
    return{
        props: {
            categoryList: response.data
        }
    }
});