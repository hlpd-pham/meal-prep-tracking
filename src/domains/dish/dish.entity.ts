import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";

export enum DishType {
    Breakfast = "BREAKFAST",
    Lunch = "LUNCH",
    Dinner = "DINNER"
}

@Entity()
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('enum', { enum: DishType })
    type: DishType;

    @Column()
    quantity: number = 1;

    @JoinTable()
    @ManyToMany(
        type => Order,
        order => order.dishes,
    )
    orders?: Order[]

}