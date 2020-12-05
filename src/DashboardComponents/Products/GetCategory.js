import axios from "axios";

let response = []

async function GetCategory() {

    const getPages = await axios.get(`https://api.didartshop.ir/admin/category_mng/get_category?page=0`,
        {
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    const pages = getPages.data.data.pages
    for (let i = 0; i <= pages; i++) {
        response[i] = await axios.get(`https://api.didartshop.ir/admin/category_mng/get_category?page=${i}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('Authorization')
                }
            })
    }
    const categories = []
    categories.push(
        response.map((res) => {
            return res.data.data.categories
        }))
    return categories
}

export default GetCategory