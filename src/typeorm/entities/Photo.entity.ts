import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity.entity";

@Entity({name:'tbl_photo'})
export class Photo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    image_name:string
}