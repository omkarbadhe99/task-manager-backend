import { Entity,Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Category } from "./category.entity";


@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    created_at:Date;

    @Column({nullable: true })
    deleted_by: string;

    @OneToMany(()=> Category,(category)=>category.user)
    categories:Category[];
    
}