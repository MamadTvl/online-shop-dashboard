import {useEffect, useState} from "react";
import {useAxios} from "../../../utills/Hooks/useAxios";

function useOrderDetails(fetch, id) {
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(true)
    const [, getPayment] = useAxios({
        url: `admin/payment_mng/get_payment_by_id?payment_id=${id}`,
    }, {manual: true})

    useEffect(() => {
        async function getResult() {
            try {
                setLoading(true)
                const response = await getPayment()
                setResult(response.data.data)
            } catch (err) {

            }
            setLoading(false)
        }

        if (fetch)
            getResult().then()

    }, [fetch, getPayment, id])

    return [loading, result]
}

export default useOrderDetails
