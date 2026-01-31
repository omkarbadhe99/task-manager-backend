import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{
    
    @CreateDateColumn({type:'datetime', precision: 0})
    created_at:Date;

    @Column({type:'int',nullable:true})
    created_by:number;
    
    @UpdateDateColumn({type:'datetime', precision: 0})
    updated_at : Date;

    @Column({type:'int',nullable:true})
    updated_by:number | null;

    @DeleteDateColumn({type:'datetime',nullable:true,precision: 0})
    deleted_at:Date | null;

    @Column({type:'int',nullable:true})
    deleted_by:number | null;
}