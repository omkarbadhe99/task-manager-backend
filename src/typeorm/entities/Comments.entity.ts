import { Column,PrimaryColumn,Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity.entity";

@Entity({name:'tbl_comments'})

export class Comments extends BaseEntity{
    @PrimaryColumn()
    id:number

    @Column()
    comment:string
}