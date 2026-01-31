import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => User, (user) => user.categories)
    user: User
    @Column({ nullable: true })
    userId: number;
    @Column()
    created_at: Date;

    @Column({ type:'int',nullable: true })
    deleted_by: number | null;
    
}