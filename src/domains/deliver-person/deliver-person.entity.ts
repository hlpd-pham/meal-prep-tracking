import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class DeliverPerson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    email?: string;
}