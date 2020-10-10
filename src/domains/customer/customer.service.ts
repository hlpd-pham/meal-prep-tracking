import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/domains/customer/customer.model';
import { CustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @Inject(Customer)
        private readonly customerModel: typeof Customer 
    ) {}

    findAll() {
        return this.customerModel.query();
    }

    async findOne(id: string) {
        const customer = await this.customerModel.query().findById(+id);
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`)
        }
        return customer
    }

    async create(createCustomerDto: CustomerDto) {
        const customer = await this.customerModel.query().insert(createCustomerDto);
        console.log(customer);
        return customer
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
        const customer = await this.customerModel.query().findById(+id).patch(updateCustomerDto);
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`)
        }
        return customer;
    }

    async remove(id: string) {
        return await this.customerModel.query().deleteById(+id);
    }

    async preloadCustomerByName(customer: Customer): Promise<Customer> {
        if (customer.id) {
            const existingCustomer = await this.customerModel.query().findById(customer.id);
            if (!customer) {
                throw new NotFoundException(`Customer #${customer.id} not found`)
            }
            return existingCustomer;
        }
        return await this.customerModel.query().insert(customer)
    }
}
