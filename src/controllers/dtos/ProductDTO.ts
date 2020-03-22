import { Product } from "../../entities/Product";


export class ProductDto {

    defaultDTO(products : Product[]) : ProductDtoDefault[]{
        const productsDto : ProductDtoDefault[] = []
        console.log(products)
        for (const product of products) {
            productsDto.push(this.transformProductToProductDtoDefault(product))
        }
        return productsDto;
    }

    transformProductToProductDtoDefault(product : Product) : ProductDtoDefault{
        let productDtoDefault : ProductDtoDefault = {
            id : product.id,
            image : product.image,
            ingredients : product.ingredients,
            maxNumberPeopleToServeDesc : `Serve ${product.maxNumberPeopleToServe} pessoa(as).`,
            measuredDesc : `${product.measuredValue}${product.typeMeasured}`,
            name : product.name,
            priceDesc: `R$${product.price}`
        }
        return productDtoDefault
    }
}


interface ProductDtoDefault{
    id : number,
    name: string,
    image: string,
    priceDesc: string,
    ingredients: string,
    measuredDesc: string,
    maxNumberPeopleToServeDesc: string,
}