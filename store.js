"use strict";

function statement(customer, movies) {
    let totalAmount = 0;
    let totalFrequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;
    for (let r of customer.rentals) {
        let movie = movies[r.movieID];
        let thisAmount = 0;

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (r.days > 2) {
                    thisAmount += (r.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = r.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (r.days > 3) {
                    thisAmount += (r.days - 3) * 1.5;
                }
                break;
        }

        //add frequent renter points
        totalFrequentRenterPoints++;
        // add bonus for a two day new release rental
        if (movie.code === "new" && r.days > 2)
            totalFrequentRenterPoints++;

        //print figures for this rental
        result += `\t${movie.title}\t${thisAmount}\n`;
        totalAmount += thisAmount;
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

    return result;
}

let customer = {
    name: "martin",
    rentals: [
        {
            "movieID": "F001",
            "days": 3
        }, {
            "movieID": "F002",
            "days": 1
        }
    ]
};

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    }
    // etc
};

/**
 * Temporal test for refactoring (to simplify result checking)
 * @param {string} actualResult - actually obtained result
 * @returns {Boolean}
 */
let testForStatementResult = function(actualResult) {
    let expectedResult = 'Rental Record for martin\n\tRan\t3.5\n\tTrois Couleurs: Bleu\t2\nAmount owed is 5.5\nYou earned 2 frequent renter points\n';
    if (actualResult !== expectedResult) {
        throw new Error('Result value changed\n\nEXPECTED:\n' + expectedResult + '\n\nOBTAINED:\n' + actualResult);
    }
};

let statementResult = statement(customer, movies);
testForStatementResult(statementResult);
console.log(statementResult);
