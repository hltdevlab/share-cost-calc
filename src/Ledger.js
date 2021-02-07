import PayableTransaction from './PayableTransaction';

class Ledger {
    constructor(person) {
        this.person = person;
        this.transactions = [];
        this.payableTransactions = [];
    }

    getTransactions() {
        return this.transactions;
    }

    addTransaction(transaction) {
        this.transactions = [...this.transactions, transaction];
    }

    getPayableTransactions() {
        return this.payableTransactions;
    }

    addPayableTransaction_old(transaction) {
        const descriptionToAdd = transaction.getDescription();
        const amountToAdd = transaction.getAmount();

        const foundTransaction = this.payableTransactions.find((payableTransaction) => {
            const existingDescription = payableTransaction.getDescription();
            return (existingDescription === descriptionToAdd);
        });

        if (foundTransaction) {
            // update existing payableTransactions
            const existingAmount = foundTransaction.getAmount();
            foundTransaction.setAmount(
                existingAmount + amountToAdd
            );
        }
        else {
            // add new entry to payableTransactions
            this.payableTransactions = [...this.payableTransactions, transaction];
        }
    }

    addPayableTransaction(personToPayTo, amount) {
        const transaction = new PayableTransaction(personToPayTo, amount)

        const foundTransaction = this.payableTransactions.find((payableTransaction) => {
            const existingPersonToPayTo = payableTransaction.getPersonToPayTo();
            return (existingPersonToPayTo === personToPayTo);
        });

        if (foundTransaction) {
            // update existing payableTransactions
            const existingAmount = foundTransaction.getAmount();
            foundTransaction.setAmount(
                existingAmount + amount
            );
        }
        else {
            // add new entry to payableTransactions
            this.payableTransactions = [...this.payableTransactions, transaction];
        }
    }

    findPayableTransaction(personToFind) {
        const payableTransaction = this.payableTransactions
            .find((payableTransaction) => (
                payableTransaction.getPersonToPayTo() === personToFind
            ));
        return payableTransaction;
    }

    deletePayableTransaction(payableTransactionToDelete) {
        this.payableTransactions = this.payableTransactions.filter((payableTransaction) => {
            return (!payableTransaction.equals(payableTransactionToDelete))
        });
    }

    toString() {
        let str = `${this.person}:\n`;
        this.transactions.forEach((transaction) => {
            str += `  ${transaction.toString()}\n`
        });
        str += `  --------------------\n`;
        this.payableTransactions.forEach((transaction) => {
            str += `  ${transaction.toString()}\n`
        });
        str += `  ====================\n\n`;
        return str;
    }
};

export default Ledger;