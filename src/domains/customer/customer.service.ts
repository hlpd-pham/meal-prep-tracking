import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../customer/customer.model';
import { CustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  /** get all customers with orders */
  findAll() {
    return this.customerModel.query().withGraphFetched({ orders: true });
  }

  async findOne(id: string) {
    const customer = await this.customerModel
      .query()
      .findById(+id)
      .withGraphFetched({ orders: true });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(customerDto: CustomerDto) {
    const customer = await this.customerModel.query().insert(customerDto);
    return customer;
  }

  /** Update a customer and return updated result */
  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updatingResult = await this.customerModel
      .query()
      .patch(updateCustomerDto)
      .findById(+id)
      .withGraphFetched({ orders: true });
    if (!updatingResult) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return updatingResult;
  }

  /** Delete a customer record and return number of deleted rows (should be 1) */
  async remove(id: string) {
    const deletingResult = await this.customerModel.query().deleteById(+id);
    if (deletingResult === 0) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return deletingResult;
  }

  /** Load an existing customer, if there isn't one, create and return */
  async preloadCustomer(customer: Customer): Promise<Customer> {
    if (customer.id) {
      const existingCustomer = await this.customerModel
        .query()
        .findById(+customer.id)
        .withGraphFetched({ orders: true });
      if (!existingCustomer) {
        throw new NotFoundException(`Customer #${customer.id} not found`);
      }
      return existingCustomer;
    }
    return await this.customerModel.query().insert(customer);
  }
}
