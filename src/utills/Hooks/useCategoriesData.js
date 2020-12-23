import {useEffect, useState} from "react";
import {useAxios} from "./useAxios";


function useCategoriesData(fetch) {
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [, getCategories] = useAxios({
        url: '/get_all_category',
    }, {manual: true})

    useEffect(() => {
        async function getResult() {
            try {
                setLoading(true)
                const response = await getCategories()
                setResult(response.data.data.categories)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }

        if (fetch)
            getResult().then()

    }, [fetch])

    return [loading, result]
}

export default useCategoriesData