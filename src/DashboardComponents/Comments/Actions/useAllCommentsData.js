import {useEffect, useState} from "react";
import {useAxios} from "../../../utills/Hooks/useAxios";
import {useHistory} from "react-router-dom"

function useAllCommentsData(fetch, page) {
    const history = useHistory()
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(true)
    const [, getAllComments] = useAxios({
        url: `/admin/comment_mng/get_all_comment?page=${page}`,
    }, {manual: true})

    useEffect(() => {
        async function getResult() {
            try {
                setLoading(true)
                const response = await getAllComments()
                setResult({
                    pages: response.data.data.pages,
                    comments: response.data.data.comments
                })

            } catch (err) {
                history.go(0)
            }
            setLoading(false)
        }

        if (fetch)
            getResult().then()

    }, [fetch, page])

    return [loading, result]
}

export default useAllCommentsData