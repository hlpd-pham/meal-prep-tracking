import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../order/order.model';
import { DeliverPersonDto, UpdateDeliverPersonDto } from './deliver-person.dto';
import { DeliverPerson } from './deliver-person.model';

@Injectable()
export class DeliverPersonService {
  constructor(
    @Inject(DeliverPerson)
    private readonly deliverPersonModel: typeof DeliverPerson,
    @Inject(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async findAll(): Promise<DeliverPerson[]> {
    return await this.deliverPersonModel.query();
  }

  async findOne(id: string) {
    const deliverPerson = await this.deliverPersonModel.query().findById(+id);
    if (!deliverPerson) {
      throw new NotFoundException(`Deliver person #${id} not found`);
    }
    return deliverPerson;
  }

  async create(deliverPersonDto: DeliverPersonDto) {
    const { orderId, ...deliverPersonInfo } = deliverPersonDto;
    const deliverPerson = await this.deliverPersonModel
      .query()
      .insert(deliverPersonInfo);
    if (orderId) {
      const existingOrder = await this.orderModel.query().findById(+orderId);
      if (!existingOrder) {
        throw new NotFoundException(`Order #${orderId} not found`);
      }

      // deliverPerson.$relatedQuery('orders').relate(existingOrder);
    }
    return deliverPerson;
  }

  async update(
    deliverPersonId: string,
    updateDeliverPersonDto: UpdateDeliverPersonDto,
  ) {
    const { orderId, ...deliverPersonInfo } = updateDeliverPersonDto;
    const deliverPerson = await this.deliverPersonModel
      .query()
      .findById(+deliverPersonId)
      .withGraphFetched('orders');

    if (!deliverPerson) {
      throw new NotFoundException(
        `Deliver person #${deliverPersonId} not found`,
      );
    }

    await this.deliverPersonModel
      .query()
      .findById(+deliverPersonId)
      .patch(deliverPersonInfo);

    if (orderId) {
      const preloadedOrder = await this.orderModel.query().findById(+orderId);
      if (!preloadedOrder) {
        throw new NotFoundException(`Order #${orderId} not found`);
      }

      // TODO: investigate many-many relation b/w order & deliver_person
    }

    return deliverPerson;
  }

  async remove(deliverPersonId: string) {
    const affectedRows = await this.deliverPersonModel
      .query()
      .deleteById(+deliverPersonId);
    if (affectedRows < 1) {
      throw new NotFoundException(
        `Deliver person #${deliverPersonId} not found`,
      );
    }
    return affectedRows;
  }
}
