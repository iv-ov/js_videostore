"use strict";

function statement(customer, movies) {
    let totalAmount = 0;
    let totalFrequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        let movie = getMovieForRental(rental);
        let thisAmount = getAmountForMovie(movie, rental);

        //add frequent renter points
        totalFrequentRenterPoints++;
        // add bonus for a two day new release rental
        if (movie.code === "new" && rental.days > 2)
            totalFrequentRenterPoints++;

        //print figures for this rental
        result += `\t${movie.title}\t${thisAmount}\n`;
        totalAmount += thisAmount;
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

    return result;


    function getMovieForRental(rental) {
        return movies[rental.movieID];
    }

    /**
     * determines amount for each movie
     * @param {Object} movie
     * @param {Object} rental
     * @returns {Number}
     */
    function getAmountForMovie(movie, rental) {
        let thisAmount = 0;
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (rental.days > 2) {
                    thisAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = rental.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (rental.days > 3) {
                    thisAmount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }

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
