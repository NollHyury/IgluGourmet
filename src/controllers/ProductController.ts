import {Request, Response} from "express";
import {getRepository, Repository} from 'typeorm';
import {validate, IsEmpty} from "class-validator";
import {Product} from "../entities/Product";
import {ProductDto} from './dtos/ProductDTO';
import { User } from "../entities/User";
import { MeasuredTypeEnum } from "../models/MeasuredTypeEnum";
import { isEmpty } from "../helpers/isEmpty";


class ProductController{
    private _dto : ProductDto;
    constructor( ){
        this._dto = new ProductDto();
    }

    

    getAllProducts = async (req: Request, res: Response) =>{
        if(req.body.type === 'ALL'){
            try {
                const dataProducts = await getRepository(Product).find()
                if(!isEmpty(dataProducts)){
                    let productsDto = this._dto.defaultDTO(dataProducts)
                    res.status(200).json(productsDto)
                }else{
                    res.status(404).send("Array vazio")
                }   
            } catch (error) {
                res.status(404).send(error)
            }
        }else{
            try {
                const dataProducts = await getRepository(Product).find(
                    {where: {typeProduct: req.body.type}}
                )
                if(!isEmpty(dataProducts)){
                    let productsDto = this._dto.defaultDTO(dataProducts)
                    res.status(200).json(productsDto)
                }else{
                    res.status(404).send("Array vazio")
                }   
            } catch (error) {
                res.status(404).send(error)
            }
        }

    }

    getOneProduct = async(req : Request, res: Response)=>{
        const product = await getRepository(Product).findOneOrFail(req.params.id);
        let productDTO = this._dto.transformProductToProductDtoDefault(product)
        res.json(productDTO).status(200);
    }

    createOneProduct = async (req : Request, res : Response)=>{
        let {
            name, price, image, maxNumberPeopleToServe, measuredValue,
            ingredients, typeProduct, userid
        } = req.body
        
        const id = req.body.userid;

        //Get the user from database
        let user = new User()
        const userRepository = getRepository(User);
        try {
            const dataUser = await userRepository.findOneOrFail(id, {
            select: ["id", "username", "role", "name"] //We dont want to send the password on response
            });
            user.id = dataUser.id,
            user.name = dataUser.name,
            user.role = dataUser.role,
            user.username = dataUser.username

            console.log(user)
        } catch (error) {
             res.status(404).send("User not found");
        }
       

        let product = new Product();
        product.name = name;
        product.price = price;
        product.image = image;
        product.maxNumberPeopleToServe = maxNumberPeopleToServe;
        product.ingredients = ingredients;
        product.typeProduct = typeProduct;
        product.user = user

        if(typeProduct === "BEVERAGE"){
            if(measuredValue >= 1000){
                product.measuredValue = this._mlToLiters(measuredValue)
                product.typeMeasured = MeasuredTypeEnum.l
            }
            else{
                product.measuredValue = measuredValue;
                product.typeMeasured = MeasuredTypeEnum.ml 
            }
        };

        const errors = await validate(product);
        if(errors.length > 0){
            res.status(400).send(errors)
            return;
        }

        try {
            await getRepository(Product).save(product)
        } catch (error) {
            res.status(409).send("Algo deu errado!")
            return
        }

        res.status(201).send("Product created");
    }




    private _mlToLiters(mlValue):number{
        let liters = mlValue/1000
        return liters
    }

}


export default ProductController;