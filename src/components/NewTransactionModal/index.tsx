import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import ReactModal from 'react-modal';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('');
        onRequestClose();
    }

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
            <img className="react-modal-close" src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input placeholder="Título" value={title} onChange={(event) => setTitle(event.target.value)} />
                <input placeholder="Valor" type="nunber" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
                <TransactionTypeContainer>
                    <RadioBox type="button" onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor="green">
                        <img src={incomeImg} alt="" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button" onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor="red">
                        <img src={outcomeImg} alt="" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} />
                <button type="submit">Cadastrar</button>
            </Container>
        </ReactModal>
    );
}
