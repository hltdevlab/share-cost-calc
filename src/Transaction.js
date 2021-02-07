import * as Utils from './utils';

class Transaction {
    constructor(description, amount) {
        this.description = description;
        this.amount = amount;
    }

    getDescription() {
        return this.description;
    }

    getAmount() {
        return this.amount;
        // return this.__to2Decimal(this.amount);
    }

    setAmount(amount) {
        this.amount = amount;
    }

    equals(transaction) {
        const transactionStr1 = JSON.stringify(this);
        const transactionStr2 = JSON.stringify(transaction);
        return (transactionStr1 === transactionStr2);
    }

    toString() {
        return `${this.description}: $${Utils.to2DecimalStr(this.amount)}`;
    }
};

export default Transaction;