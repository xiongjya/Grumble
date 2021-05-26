class Pair {
    constructor(offer, option) {
        this.offer = offer;
        this.option = option;
    }
}

module.exports = [
    {
        address: '451 Clementi Ave 3, #01-309, Singapore 120451',
        contact: '6779 8834',
        image: require('../images/mcdonalds.png'),
        name: "McDonald's",
        operation: '6am - 12am', 
        options: [new Pair(false, 'Dine in'), new Pair(true, 'Takeaway'), new Pair(true, 'No contact delivery')],
        reviews: ['Friendly staff, most of the staff for this outlet has been there since 2009. All of them are still there to day. During peak hours, or morning they will suggest you certain promotion meals for you'],
        website: 'https://www.mcdonalds.com.sg/',
    },
    {
        address: '2 Jurong East Central 1, #B1-18/19-8, Singapore 609731',
        contact: '6694 6045',
        image: require('../images/ramenkeisuke.png'),
        name: 'Keisuke Tonkotsu King',
        operation: '11am - 930pm', 
        options: [new Pair(false, 'Dine in'), new Pair(true, 'Takeaway')],
        reviews: ['Strong Tonkotsu broth, but abit lacking on the ramen part. Ramen too tough, can be better.'],
        website: 'https://www.keisuke.sg/',
    },
    {
        address: '3 Gateway Dr, #03-05, Singapore 608532',
        contact: '6974 0472',
        image: require('../images/genkisushi.png'),
        name: 'Genki Sushi Westgate',
        operation: '1130am - 10pm', 
        options: [new Pair(false, 'Dine in')],
        reviews: ['The sauce for the lobster, scallop and octopus is superb. I ordered by delivery as queues on normal days are very long.'],
        website: 'https://www.genkisushi.com.sg/',
    },
];