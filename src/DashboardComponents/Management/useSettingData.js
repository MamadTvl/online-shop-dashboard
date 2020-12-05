import {useEffect, useState} from "react";
import axios from "axios";


function useSettingData(fetch) {
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
                const sliderResponse = await
                    axios.get
                    ('https://api.didartshop.ir/admin/setting/cover/get', config)
                const attributesResponse = await
                    axios.get('https://api.didartshop.ir/admin/setting/motto/get', config)
                const socialResponse = await
                    axios.get('https://api.didartshop.ir/admin/setting/social_network/get', config)

                const sliders = sliderResponse.data.data.covers
                const attributes = attributesResponse.data.data.mottos
                const social = socialResponse.data.data.social_networks

                setResult([sliders, attributes, social])

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

export default useSettingData