import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { taskStaus } from "src/task/DTO/taskenum";
import { BaseEntity } from "./BaseEntity.entity";
@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'enum', enum: taskStaus, default: taskStaus.PENDING })
    status: taskStaus;

    @Column()
    userId: number

    // @Column()
    // categoryId: number
    @Column()
    categoryId: number

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Category, (cate) => cate.id)
    category: Category

    @Column({ type: 'varchar', nullable: true })
    files: string | null
}