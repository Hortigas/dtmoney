import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';

export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'deposit') {
                acc.deposits += transaction.amount;
                acc.total += transaction.amount;
            } else if (transaction.type === 'withdraw') {
                acc.withdraw += transaction.amount;
                acc.total -= transaction.amount;
            }
            return acc;
        },
        { deposits: 0, withdraw: 0, total: 0 }
    );

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <h1>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.deposits)}
                </h1>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <h1>
                    -{' '}
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.withdraw)}
                </h1>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <h1>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.total)}
                </h1>
            </div>
        </Container>
    );
}
