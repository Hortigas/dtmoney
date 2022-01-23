import incomeImg from '../../assets/income.svg';

import { Container } from './styles';

export function Summary() {
    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="" />
                </header>
                <strong>R$ 1000 reais</strong>
            </div>
        </Container>
    );
}
