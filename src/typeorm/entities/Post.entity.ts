import { Column,Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity.entity";
@Entity({name:'tbl_post'})
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    description:string
}