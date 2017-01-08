"use strict";

function statement(customer, movies) {
    let totalAmount = getTotalAmount(customer.rentals);
    let totalFrequentRenterPoints = getTotalFrequentRenterPoints(customer.rentals);
    //get figures for each rental
    let figuresList = getFiguresList(customer.rentals);

    return statementViewTxt(customer, figuresList, totalAmount, totalFrequentRenterPoints);


    function statementViewTxt(customer, figuresList, totalAmount, totalFrequentRenterPoints) {
        let result = `Rental Record for ${customer.name}\n`;
        //print figures for each rental
        for (let figure of figuresList) {
            result += `\t${figure.title}\t${figure.amount}\n`;
        }
        // add footer lines
        result += `Amount owed is ${totalAmount}\n`;
        result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

        return result;
    }

    function getMovieForRental(rental) {
        return movies[rental.movieID];
    }

    /**
     * determines amount for rental's movie
     * @param {Object} rental
     * @returns {Number}
     */
    function getAmount(rental) {
        let movie = getMovieForRental(rental);
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

    function getTotalAmount(rentals) {
        let totalAmount = 0;
        for (let rental of rentals) {
            totalAmount += getAmount(rental);
        }
        return totalAmount;
    }

    function getFrequentRenterPoints(rental) {
        let movie = getMovieForRental(rental);
        // add bonus for a two day new release rental
        return (movie.code === "new" && rental.days > 2) ? 2 : 1;
    }

    function getTotalFrequentRenterPoints(rentals) {
        let totalFrequentRenterPoints = 0;
        for (let rental of rentals) {
            totalFrequentRenterPoints += getFrequentRenterPoints(rental);
        }
        return totalFrequentRenterPoints;
    }

    function getFiguresList(rentals) {
        let figuresList = [];
        for (let rental of rentals) {
            let movie = getMovieForRental(rental);
            figuresList.push({
                title: movie.title,
                amount: getAmount(rental)
            });
        }
        return figuresList;
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
let testForStatementResult = function (actualResult) {
    let expectedResult = 'Rental Record for martin\n\tRan\t3.5\n\tTrois Couleurs: Bleu\t2\nAmount owed is 5.5\nYou earned 2 frequent renter points\n';
    if (actualResult !== expectedResult) {
        throw new Error('Result value changed\n\nEXPECTED:\n' + expectedResult + '\n\nOBTAINED:\n' + actualResult);
    }
};

let statementResult = statement(customer, movies);
testForStatementResult(statementResult);
console.log(statementResult);
