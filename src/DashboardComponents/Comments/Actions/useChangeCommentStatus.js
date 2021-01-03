import {useEffect, useState} from "react";
import {useAxios} from "../../../utills/Hooks/useAxios";
import {useHistory} from "react-router-dom";

function useChangeCommentStatus(fetch, id, status) {
    const history = useHistory()
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [, changeStatus] = useAxios({
        url: '/admin/comment_mng/update_comment_status',
        method: 'PATCH',
    }, {manual: true})

    useEffect(() => {
        async function getResult() {
            try {
                setLoading(true)
                const response = await changeStatus({
                    data: {
                        "id": id,
                        "status": status,
                    }
                })
                setResult(response.data.data)
            } catch (err) {
                setResult(null)
            }
            setLoading(false)
        }

        if (fetch)
            getResult().then()

    }, [fetch])

    return [loading, result]
}

export default useChangeCommentStatus