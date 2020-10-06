import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from '../order/order.entity';

export enum CustomerType {
    OneTime = "ONE_TIME",
    Recurring = "RECURRING",
}

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;
    
    @Column({ nullable: true })
    email?: string;
    
    @Column()
    address: string;
    
    @Column()
    type: CustomerType;

    @JoinTable()
    @OneToMany(
        type => Order,
        order => order.customer,
        {
            cascade: true
        }
    )
    orders?: Order[]
}