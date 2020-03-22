import {Length, MinLength, IsNotEmpty } from 'class-validator';
import {PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Entity, Double, ManyToOne } from 'typeorm';
import { User } from './User';
import { MeasuredTypeEnum } from '../models/MeasuredTypeEnum';
import { ProductTypeEnum } from '../models/ProductTypeEnum';



@Entity()
@Unique(["name"])
export class Product{
    
    constructor(){}

    @PrimaryGeneratedColumn()
    id: number;

    @Column('enum', {name: 'productType', enum: ProductTypeEnum, default: ProductTypeEnum.APPETIZER})
    @IsNotEmpty()
    typeProduct : ProductTypeEnum

    @Column()
    @Length(4,20)
    name: string;

    @Column("double precision")
    @IsNotEmpty()
    price: number

    @Column()
    @Length(2,60)
    image: string;

    @Column()
    @IsNotEmpty()
    maxNumberPeopleToServe: number

    @Column("double precision")
    @IsNotEmpty()
    measuredValue: number

    @Column('enum', {name: 'measuredType', enum: MeasuredTypeEnum, default:MeasuredTypeEnum.g})
    @IsNotEmpty()
    typeMeasured : MeasuredTypeEnum

    @Column()
    @IsNotEmpty()
    ingredients: string

    @ManyToOne(type=>User, user=>user.products)
    user : User

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}