import {useEffect, useState} from "react";
import axios from "axios";


function useCampaignsData(fetch) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        "Authorization": localStorage.getItem('Authorization')
                    }
                }
                const campaignResponse = await
                    axios.get
                    ('https://api.didartshop.ir/admin/campaign_mng/get', config)
                const amazingOfferResponse = await
                    axios.get('https://api.didartshop.ir/admin/amazing_offer_mng/get', config)

                const campaigns = campaignResponse.data.data.campaigns
                for (let i = 0; i < campaigns.length; i++) {
                    if (campaigns[i].percent_of_discount){
                        campaigns[i].percent_of_discount *= 100
                    }else {
                        campaigns[i].percent_of_discount = 0
                    }
                }
                const amazingOffer = amazingOfferResponse.data.data
                console.log([campaigns, amazingOffer.merchandise_list, amazingOffer.cover])
                setResult([campaigns, amazingOffer.merchandise_list, amazingOffer.cover])

                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        if (fetch) {
            fetchData().then()
        }
    }, [fetch]);

    return [result, loading];
}

export default useCampaignsData