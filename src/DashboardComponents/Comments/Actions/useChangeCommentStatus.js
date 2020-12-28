import {useEffect, useState} from "react";
import {useAxios} from "../../../utills/Hooks/useAxios";
import {useHistory} from "react-router-dom";

function useChangeCommentStatus(fetch, id, status) {
    const history = useHistory()
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [, changeStatus] = useAxios({
        url: '/admin/comment_mng/delete_comment',
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
                history.go(0)
            }
            setLoading(false)
        }

        if (fetch)
            getResult().then()

    }, [fetch])

    return [loading, result]
}

export default useChangeCommentStatus