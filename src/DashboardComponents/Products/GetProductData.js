import axios from "axios";

async function GetProductData() {
    let params = (new URL(document.location)).searchParams;
    const id = params.get("id")
    let data = {}
    if (id !== null) {
        const productData = await axios.get(
            `https://api.didartshop.ir/admin/merchandise_mng/get_merchandise?id=${id}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('Authorization')
                }
            }
        )


        const setCampaign = (campaign) => {
            let id = campaign === null ? null : campaign.id
            switch (id) {
                case 1:
                    return {
                        id: 1,
                        value: "کمپین ۱",
                        label: "کمپین ۱",
                    }
                case 2:
                    return {
                        id: 2,
                        value: "کمپین ۲",
                        label: "کمپین ۲",
                    }
                case 3: {
                    return {
                        id: 3,
                        value: "کمپین ۳",
                        label: "کمپین ۳",
                    }
                }
                default:
                    return {
                        id: null,
                        value: "نا مشخص",
                        label: "نا مشخص",
                    }
            }
        }
        const setStockValues = (stock_list) => {
            let stockValues = []
            for (let i = 0; i < stock_list.length; i++) {
                stockValues.push({
                    color: stock_list[i].color,
                    size: stock_list[i].size,
                    count: stock_list[i].stock_number,
                })
            }
            return stockValues
        }

        const merchandise = productData.data.data.merchandise

        data = {
            colorTags: new Set(merchandise.color_list),
            sizeTags: new Set(merchandise.size_list),
            productInfoValues: {
                title: merchandise.title,
                detail: merchandise.specification,
                describe: merchandise.description,
                price: merchandise.price,
                discount:
                    merchandise.percent_of_discount === null ? 0
                        : merchandise.percent_of_discount * 100,
            },
            selectedCategory: merchandise.category,
            selectedCampaign: setCampaign(merchandise.campaign),
            tags: new Set(merchandise.tag_list),
            stockValues: setStockValues(merchandise.stock_list),
            stock_list: merchandise.stock_list,
            afterOrderValue: merchandise.merchandise_type == 2 && merchandise.is_exist ? merchandise.stock_number : 0,
            isExist: merchandise.is_exist,
            productType: merchandise.merchandise_type,
            preview_image: merchandise.preview_image,
            other_images: merchandise.other_image_list,
        }
    }


    return data
}

export default GetProductData