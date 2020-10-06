import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundError } from "objection";
import { Repository } from "typeorm";
import { UpdateCustomerDto } from "../customer/customer.dto";
import { CreateDishDto, UpdateDishDto } from "./dish.dto";
import { Dish } from "./dish.entity";

@Injectable() 
export class DishService {
    constructor(
        @InjectRepository(Dish)
        private readonly dishRepository: Repository<Dish>
    ) {}

    findAll() {
        return this.dishRepository.find({
            relations: ['orders']
        })
    }

    async findOne(id: string) {
        const dish = await this.dishRepository.findOne(id, { relations: ['orders'] })
        if (!dish) {
            throw new NotFoundError(`Dish #${id} not found`)
        }
        return dish;
    }

    create(createDishDto: CreateDishDto) {
        const dish = this.dishRepository.create(createDishDto);
        return this.dishRepository.save(dish);
    }

    async update(id: string, updateDishDto: UpdateDishDto) {
        const dish = await this.dishRepository.preload({
            id: +id,
            ...updateDishDto,
        })
        console.log(dish)
        if (!dish) {
            throw new NotFoundError(`Dish #${id} not found`)
        }
        return dish;
    }

    async remove(id: string) {
        const dish = await this.findOne(id)
        return this.dishRepository.remove(dish);
    }
}