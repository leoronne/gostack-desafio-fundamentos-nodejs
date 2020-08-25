import { Router, response } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (req, res) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return res.json({
      transactions,
      balance,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (req, res) => {
  try {
    const { title, value, type } = req.body;
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    return res.json(createTransaction.execute({ title, value, type }));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
