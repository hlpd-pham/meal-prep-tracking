import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../customer/customer.model';
import { CustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @Inject(Customer)
        private readonly customerModel: typeof Customer 
    ) {}

    findAll() {
        return this.customerModel.query().withGraphFetched('orders')
    }

    async findOne(id: string) {
        const customer = await this.customerModel.query().findById(+id)
                                .withGraphFetched('orders')
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`)
        }
        return customer
    }

    async create(createCustomerDto: CustomerDto) {
        const customer = await this.customerModel.query().insert(createCustomerDto);
        return customer
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
        const updatingResult = await this.customerModel.query().findById(+id).patch(updateCustomerDto);
        if (updatingResult === 0) {
            throw new NotFoundException(`Customer #${id} not found`)
        }
        return updatingResult;
    }

    async remove(id: string) {
        const deletingResult = await this.customerModel.query().deleteById(+id);
        if (deletingResult === 0) {
            throw new NotFoundException(`Customer #${id} not found`)
        }
        return deletingResult;
    }

    async preloadCustomer(customer: Customer): Promise<Customer> {
        if (customer.id) {
            const existingCustomer = await this.customerModel.query().findById(+customer.id);
            if (!existingCustomer) {
                throw new NotFoundException(`Customer #${customer.id} not found`)
            }
            return existingCustomer;
        }
        return await this.customerModel.query().insert(customer)
    }
}
