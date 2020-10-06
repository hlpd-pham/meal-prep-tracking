
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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
        customer => customer.orders,
        {
            cascade: true
        }
    )
    customer: Customer;

    @JoinTable()
    @ManyToMany(
        type => Dish,
        dish => dish.orders,
        {
            cascade: true
        }
    )
    dishes?: Dish[];

    @Column('date')
    orderDate: Date;

    @Column('date')
    deliveryDate: Date;

    @Column()
    status: OrderStatus;
}