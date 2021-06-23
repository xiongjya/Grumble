
import axios from "axios";


const yelp = axios.create({
    baseURL : "https://api.yelp.com/v3/businesses",
    headers : {
        Authorization : "Bearer jlB5ISPke4fWXgsmW8iwdVI5T2oJ4CqFTGaEGHUphhlv4bjqSEz1wj4cf6QPR-cPdZ3kHk_aEXKZhwaV6e1F2MHepOTwa8QgX38zmJhEDVpIwwtcId8XtvdQxCvMYHYx"
    }
});

export const search = async (dietOps, diningOps, location, priceCeil) => {
    const categories = '&categories=' + dietOps
                                            .map(x => x.replace(' ', '').toLowerCase())
                                            .toString();
    const getPrices = x => {
        const arr = [];
        for (let i = 1; i <= x; i++) {
            arr.push(i);
        }
        return arr.toString();
    }
    const price = '&price=' + getPrices(priceCeil)
    try {
        const url = `/search?locale=en_SG&categories=restaurants`;
        alert(url);
      const response = await yelp.get('/search', {
        params: {
            limit: 50,
            term: 'pasta',
            location: 'san jose'
        }
        });
    console.log(response.data.businesses)
      return response.data.businesses;
    } catch (err) {
      alert(err);
    }
};