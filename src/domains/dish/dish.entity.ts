import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}