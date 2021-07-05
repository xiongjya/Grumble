import axios from "axios";

const yelp = axios.create({
    baseURL : "https://api.yelp.com/v3/businesses",
    headers : {
        Authorization : "Bearer jlB5ISPke4fWXgsmW8iwdVI5T2oJ4CqFTGaEGHUphhlv4bjqSEz1wj4cf6QPR-cPdZ3kHk_aEXKZhwaV6e1F2MHepOTwa8QgX38zmJhEDVpIwwtcId8XtvdQxCvMYHYx"
    }
});

export const search = async (dietOps, latitude, longitude, location, radius, priceCeil) => {
    const getPrices = x => {
        const arr = [];
        for (let i = 1; i <= x; i++) {
            arr.push(i);
        }
        return arr.toString();
    }

    const params = {
        categories: dietOps.join(','),
        limit: 50,
        price: getPrices(priceCeil),
        radius: radius,
        term: 'restaurants'
    };

    if (location) {
        params.location = location;
    } else {
        params.latitude = latitude;
        params.longitude = longitude;
    }

    try {
        const response = await yelp.get('/search', { params });

        let restaurants = response.data.businesses;
        restaurants = restaurants
                        .filter(item => item.is_closed !== false)
                        .slice(0, 10);

        return restaurants;
    } catch (err) {
        alert(err);
    }
};