
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Customer } from "../customer/customer.entity";
import { Dish } from "../dish/dish.entity";

export enum OrderStatus {
    Received = "RECEIVED",
    InProgress = "IN_PROGRESS",
    OutForDelivery = "OUT_FOR_DELIVERY",
    Deliverd = "DELIVERED"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinTable()
    @ManyToOne(
        type => Customer,
        customer => customer.orders
    )
    customer: Customer;

    @Column('json')
    dishes: Dish[];

    @Column('date')
    orderDate: Date;

    @Column('date')
    deliveryDate: Date;

    @Column()
    status: OrderStatus;
}