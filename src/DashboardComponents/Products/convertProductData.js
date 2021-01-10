export const productData = (id, path, InfoValues, category, tags, colors,
                            sizes, campaign, isExist, product_type,
                            afterOrderCount) => {

    let data = {
        "merchandise_type": product_type,
        "title": InfoValues.title,
        "price": InfoValues.price,
        "has_discount": InfoValues.discount !== 0,
        "percent_of_discount": InfoValues.discount / 100,
        "specification": InfoValues.detail,
        "description": InfoValues.describe,
        "category": category.id,
        "tag_list": tags,
        "color_list": colors,
        "size_list": sizes,
        "campaign": campaign.id,
        "is_exist": isExist,
    }
    if (path) {
        data = {
            ...data,
            "id": id,
        }
    }
    if (product_type == 1) {
        return data
    } else if (isExist) {
        return {
            ...data,
            "type_2_stock_number": parseInt(afterOrderCount),
        }
    } else {
        return data
    }
}

export const stockData = (id, product_type, index, stockValues, isExist) => {
    return {
        "merchandise": id,
        "size": stockValues[index].size,
        "color": stockValues[index].color,
        "stock_number": isExist && product_type == 1 ? parseInt(stockValues[index].count) : 0,
    }
}


