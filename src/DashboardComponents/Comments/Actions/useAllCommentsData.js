import {useEffect, useState} from "react";
import {useAxios} from "../../../utills/Hooks/useAxios";

function useAllCommentsData(fetch, page, showNew) {
    const [result, setResult] = useState({
        pages: -1,
        comments: []
    })
    const [loading, setLoading] = useState(true)
    const [, getAllComments] = useAxios({
        url: `/admin/comment_mng/get_all_comment?page=${page}${showNew ? '&new=true' : ''}`,
    }, {manual: true})

    useEffect(() => {
        async function getResult() {
            try {
                setLoading(true)
                const response = await getAllComments()
                setResult({
                    pages: response.data.data.pages + 1,
                    comments: response.data.data.comments
                })

            } catch (err) {
                setResult({
                    pages: -1,
                    comments: []
                })
            }
            setLoading(false)
        }

        if (fetch)
            getResult().then()

    }, [fetch, getAllComments, page])

    return [loading, result]
}

export default useAllCommentsData