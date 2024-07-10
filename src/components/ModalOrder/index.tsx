import Modal from "react-modal"
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps{
    isOpen: boolean;
    onClose: () => void;
    order: OrderItemProps[];
}

export function ModalOrder({isOpen, onClose, order}: ModalOrderProps){
    
    const customStyle = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    };

    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyle}
        >
            <button
            type="button"
            onClick={onClose}
            className="react-modal-close"
            style={{ background: 'transparent', border: 0}}
            >
                <FiX size={50} color="rgb(234, 128, 252)" />
            </button>

            <div className={styles.container}>
                <h2>Order Details</h2>
                <span className={styles.table}>
                    Table: <strong>{order[0].order.table}</strong>
                </span>

                {order.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span><strong>{item.product.name}</strong> - QUANTITY: {item.amount} </span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}

                <button className={styles.buttonOrder} onClick={() => {}}>
                    Finish Order
                </button>
            </div>
        
        </Modal>
    )
}