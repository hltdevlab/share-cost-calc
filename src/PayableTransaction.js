import Transaction from './Transaction';

class PayablePayableTransaction extends Transaction {
    PAYABLE_TRANSACTION_DESC_PREFIX = 'pay to ';

    constructor(personToPayTo, amount) {
        super(personToPayTo, amount);
        this.description = `${this.PAYABLE_TRANSACTION_DESC_PREFIX}${personToPayTo}`;
    }

    getPersonToPayTo() {
        const regex = new RegExp(
            `(${this.PAYABLE_TRANSACTION_DESC_PREFIX})*`,
            'i'
        );
        const personToPayTo = this.description.replace(regex, '');
        return personToPayTo;
    }
};

export default PayablePayableTransaction;