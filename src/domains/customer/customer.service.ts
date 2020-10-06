import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'objection';
import { Customer } from 'src/domains/customer/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

    findAll() {
        return this.customerRepository.find({
            relations: ['orders']
        })
    }

    async findOne(id: string) {
        const customer = await this.customerRepository.findOne(id, { relations: ['orders'] })
        if (!customer) {
            throw new NotFoundError(`Customer #${id} not found`)
        }
        return customer
    }

    create(createCustomerDto: CreateCustomerDto) {
        const customer = this.customerRepository.create(createCustomerDto);
        return this.customerRepository.save(customer);
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
        const customer = await this.customerRepository.preload({
            id: +id,
            ...updateCustomerDto,
        });
        if (!customer) {
            throw new NotFoundError(`Customer #${id} not found`)
        }
        return customer;
    }

    async remove(id: string) {
        const customer = await this.findOne(id);
        return this.customerRepository.remove(customer);
    }

    async preloadCustomerByName(customer: Customer): Promise<Customer> {
        const existingCustomer = await this.customerRepository.findOne({ where: { name: customer.name } });
        if (existingCustomer) {
            return existingCustomer;
        }
        return this.customerRepository.create(customer);
    }
}
