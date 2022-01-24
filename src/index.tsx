import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
    models: {
        transaction: Model,
    },

    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: 'freelancer',
                    type: 'deposit',
                    category: 'Dev',
                    amount: 6000,
                    createdAt: new Date('December 17, 2021 03:24:00'),
                },
                {
                    id: 2,
                    title: 'aluguel',
                    type: 'withdraw',
                    category: 'Home',
                    amount: 1500,
                    createdAt: new Date('January 13, 2021 03:24:00'),
                },
            ],
        });
    },

    routes() {
        this.namespace = 'api';
        this.get('/transactions', () => {
            return this.schema.all('transaction');
        });
        this.post('/transactions', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            return schema.create('transaction', data);
        });
    },
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
