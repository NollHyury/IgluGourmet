import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import {Length, IsNotEmpty} from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Product } from './Product';


@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4,20)
    username: string;

    @Column()
    @Length(4,100)
    password: string;

    @Column()
    @Length(2,45)
    name: string

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    @OneToMany(type => Product, product => product.user)
    products : Product[]

}