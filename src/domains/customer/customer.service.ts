import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'objection';
import { Customer } from 'src/domains/customer/customer.model';
import { CustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        private readonly customerModel: typeof Customer 
    ) {}

    findAll() {
        return this.customerModel.query();
    }

    async findOne(id: string) {
        const customer = await this.customerModel.query().findById(+id);
        if (!customer) {
            throw new NotFoundError(`Customer #${id} not found`)
        }
        return customer
    }

    async create(createCustomerDto: CustomerDto) {
        const customer = await this.customerModel.query().insert(createCustomerDto);
        return customer
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
        const customer = await this.customerModel.query().findById(+id).patch(updateCustomerDto);
        if (!customer) {
            throw new NotFoundError(`Customer #${id} not found`)
        }
        return customer;
    }

    async remove(id: string) {
        return await this.customerModel.query().deleteById(+id);
    }

    async preloadCustomerByName(customer: Customer): Promise<Customer> {30
        if (customer.id) {
            const existingCustomer = await this.customerModel.query().findById(customer.id);
            if (!customer) {
                throw new NotFoundError(`Customer #${customer.id} not found`)
            }
            return existingCustomer;
        }
        return await this.customerModel.query().insert(customer)
    }
}
