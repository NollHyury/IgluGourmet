import { Product } from "./Product";
import {Entity, Column, Unique, TableInheritance, } from 'typeorm';
import {Length, MinLength} from 'class-validator';
import { MeasuredTypeEnum } from "../models/MeasuredTypeEnum";

@Entity()
@Unique(["name"])
export class Wine extends Product{
    constructor(){
        super()
        this.typeMeasured= MeasuredTypeEnum.ml
    }
   
    @Column()
    @MinLength(4)
    harvestYear: number

    @Column()
    @Length(3, 35)
    originCoutry : string
}
