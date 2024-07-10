import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import styles from './styles.module.scss';  
import { Header } from '../../components/Header';
import { ModalOrder } from '../../components/ModalOrder';
import { FiRefreshCcw } from 'react-icons/fi';

import { setupAPIClient } from '../../services/api';
import { useState } from 'react';

import Modal from 'react-modal';

type OrderItem = {
    id: string;
    table: number | string;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps{
    orders: OrderItem[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({orders}: HomeProps){
    const [orderList, setOrderList] = useState(orders || []);
    
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal(){
        setModalVisible(false);
    }

    async function handleOpenModal(id: string){
        const api = setupAPIClient();
        const response = await api.get('/order/detail', {
            params: {
                order_id: id
            }
        });

        setModalItem(response.data);
        setModalVisible(true);
    }

    Modal.setAppElement('#__next');

    return(
        <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                
                <div className={styles.containerHeader}>
                    <h1>Orders</h1>
                    <button>
                        <FiRefreshCcw size={25} color='rgb(234, 128, 252)' />
                    </button>
                </div>

                <article className={styles.listOrders}>
                    {orderList.map((item) => (
                        <section key={item.id} className={styles.orderItem}>
                            <button onClick={() => handleOpenModal(item.id)}>
                                <div className={styles.borda}></div>
                                <span>Table {item.table}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>

            { modalVisible && (
                <ModalOrder 
                isOpen={modalVisible}
                onClose={handleCloseModal}
                order={modalItem}
                />
            )}
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const api = setupAPIClient(context);
    const response = await api.get('/orders');

    return {
        props: {
            orders: response.data
        }
    }
});