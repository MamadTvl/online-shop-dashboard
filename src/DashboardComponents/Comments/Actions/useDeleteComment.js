import {useEffect, useState} from "react";
import {useAxios} from "../../../utills/Hooks/useAxios";

function useDeleteComment(fetch, id) {
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [, deleteComment] = useAxios({
        url: '/admin/comment_mng/delete_comment',
        method: 'DELETE',
    }, {manual: true})

    useEffect(() => {
        async function getResult() {
            try {
                setLoading(true)
                const response = await deleteComment({
                    data: {
                        "id": id,
                    }
                })
                setResult(response.data.status === 'success')
            } catch (err) {
                setResult(false)
            }
            setLoading(false)
        }

        if (fetch)
            getResult().then()

    }, [fetch])

    return [loading, result]
}

export default useDeleteComment