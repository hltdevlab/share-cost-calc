import * as Utils from './utils';
import Ledger from './Ledger';
import Transaction from './Transaction';

export const calculateReturnText = ({
    people,
    items,
    whoSharingJson,
    whatCostJson,
    whoPaidJson
}) => {
    const ledgers = calculate({
        people,
        items,
        whoSharingJson,
        whatCostJson,
        whoPaidJson
    });

    if (!ledgers) {
        return '';
    }

    let text = generateSummary({
        people,
        items,
        whoSharingJson,
        whatCostJson,
        whoPaidJson
    });
    text += '******************************\n\n';

    people.forEach(person => {
        const ledger = ledgers[person];
        text += ledger.toString();
    });
    return text;
};


export const calculate = ({
    people,
    items,
    whoSharingJson,
    whatCostJson,
    whoPaidJson
}) => {
    if (
        Utils.isArrayEmpty(people)
        || Utils.isArrayEmpty(items)
        || Utils.isObjectEmpty(whoSharingJson)
        || Utils.isObjectEmpty(whatCostJson)
        || Utils.isObjectEmpty(whoPaidJson)
    ) {
        return null;
    }

    
    const ledgers = {};
    people.forEach((person) => {
        ledgers[person] = new Ledger(person);
    });

    items.forEach((item) => {
        const cost = whatCostJson[item];
        const person = whoPaidJson[item];
        const ledger = ledgers[person]
        if (ledger) {
            ledger.addTransaction(
                new Transaction(item, (-cost))
            );
        }
    });

    items.forEach((item) => {
        const cost = whatCostJson[item];
        const isSharedBy = whoSharingJson[item];

        if (isSharedBy) {
            const peopleSharingThisItem = people.filter(
                (person) => (isSharedBy[person])
            );
    
            const costPerPerson = cost / peopleSharingThisItem.length;
    
            peopleSharingThisItem.forEach((person) => {
                ledgers[person].addTransaction(
                    new Transaction(item, costPerPerson)
                );
            });
        }
    });

    
    for (const [person, ledger] of Object.entries(ledgers)) {
        const transctions = ledger.getTransactions();
        transctions.filter(
            // filter all transaction that is negative,
            // which means initially paid transaction.
            (transction) => (transction.getAmount() > 0)
        ).filter(
            // filter all transaction that is paid by
            // this person.
            (transction) => {
                const item = transction.getDescription();
                const personToPay = whoPaidJson[item];
                return (person !== personToPay);
            }
        ).forEach((transction) => {
            const item = transction.getDescription();
            const amount = transction.getAmount();
            const personToPay = whoPaidJson[item];
            if (personToPay) {
                ledger.addPayableTransaction(personToPay, amount);
            }
        });
    }

    // checking for loop transaction, negate the amount accordingly.
    people.forEach(person => {
        const pairs = findPayableTransactionPairs(person, ledgers);
        processPayableTransactionPairs(pairs);
    });

    // print logs
    console.log(JSON.stringify(ledgers, null, 2));
    people.forEach(person => {
        const ledger = ledgers[person];
        console.log(ledger.toString());
    });

    generateSummary({
        people,
        whoSharingJson,
        whatCostJson,
        whoPaidJson
    });

    return ledgers;
};

export const findPayableTransactionPairs = (person1, ledgers) => {
    const pairs = [];
    const ledger1 = ledgers[person1];
    const person1PayableTransactions = ledger1.getPayableTransactions();
    person1PayableTransactions.forEach(person1PayableTransaction => {
        const person2 = person1PayableTransaction.getPersonToPayTo();
        const ledger2 = ledgers[person2];
        const person2PayableTransactions = ledger2.getPayableTransactions();
        person2PayableTransactions.forEach(person2PayableTransaction => {
            const anotherPerson1 = person2PayableTransaction.getPersonToPayTo();
            if (anotherPerson1 === person1) {
                const pair = [{
                    ledger: ledger1,
                    payableTransaction: person1PayableTransaction
                }, {
                    ledger: ledger2,
                    payableTransaction: person2PayableTransaction
                }];

                pairs.push(pair);
            }
        });
    });
    return pairs;
};

export const processPayableTransactionPairs = (payableTransactionPairs) => {
    payableTransactionPairs.forEach(payableTransactionPair => {
        const ledger1 = payableTransactionPair[0].ledger;
        const payableTransaction1 = payableTransactionPair[0].payableTransaction;
        
        const ledger2 = payableTransactionPair[1].ledger;
        const payableTransaction2 = payableTransactionPair[1].payableTransaction;

        if (payableTransaction1.getAmount() > payableTransaction2.getAmount()) {
            payableTransaction1.setAmount(
                payableTransaction1.getAmount() - payableTransaction2.getAmount()
            );
            ledger2.deletePayableTransaction(payableTransaction2);
        }
        else if (payableTransaction1.getAmount() < payableTransaction2.getAmount()) {
            payableTransaction2.setAmount(
                payableTransaction2.getAmount() - payableTransaction1.getAmount()
            );
            ledger1.deletePayableTransaction(payableTransaction1);
        }
        else {
            // if amount equals
            ledger1.deletePayableTransaction(payableTransaction1);
            ledger2.deletePayableTransaction(payableTransaction2);
        }
    });
};

export const generateSummary = ({
    people,
    whoSharingJson,
    whatCostJson,
    whoPaidJson
}) => {
    let summaryStr = '';

    for (const [item, personWhoPaid] of Object.entries(whoPaidJson)) {
        const cost = Utils.to2DecimalStr(whatCostJson[item]);
        summaryStr += `${personWhoPaid} has paid $${cost} for ${item}.\n`;
    };

    for (const [item, peopleBooleanJson] of Object.entries(whoSharingJson)) {
        if (Utils.isObjectEmpty(peopleBooleanJson)) {
            // this json is having the initial value of empty json, so no one is ticked for that item.
            summaryStr += `Nobody is sharing the ${item}.\n`;
            continue;
        }

        const peopleYes = [];
        const peopleNo = [];
        for (const [person, boolValue] of Object.entries(peopleBooleanJson)) {
            if (boolValue) {
                peopleYes.push(person);
            }
            else {
                peopleNo.push(person);
            }
        }

        if (peopleYes.length === 1) {
            const [theOne] = peopleYes;
            summaryStr += `${theOne} is accountable for the ${item}.\n`;
        }
        else if (peopleNo.length === 1) {
            const [theOne] = peopleNo;
            summaryStr += `Everyone except ${theOne} is sharing the ${item}.\n`;
        }
        else if (people.length === peopleYes.length) {
            summaryStr += `Everyone is sharing the ${item}.\n`;
        }
        else if (people.length === peopleNo.length) {
            summaryStr += `Nobody is sharing the ${item}.\n`;
        }
        else {
            const reducer = (accumulator, currentValue, i) => {
                if (i === 0) {
                    return `${accumulator}${currentValue}`;
                }
                if (i === peopleYes.length - 1) {
                    return `${accumulator} and ${currentValue}`;
                }
                return `${accumulator}, ${currentValue}`;
            };
            summaryStr = peopleYes.reduce(reducer, summaryStr);
            summaryStr += ` is sharing the ${item}.\n`;
        }
    };

    console.log(summaryStr);
    return summaryStr;
};