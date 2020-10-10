import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "objection";
import { CreateDishDto, UpdateDishDto } from "./dish.dto";
import { Dish } from "./dish.model";

@Injectable() 
export class DishService {
    constructor(
        @Inject(Dish)
        private readonly dishModel: typeof Dish
    ) {}

    async findAll(): Promise<Dish[]> {
        return await this.dishModel.query();
    }

    async findOne(id: string) {
        const dish = await this.dishModel.query().findById(+id);
        if (!dish) {
            throw new NotFoundException(`Dish #${id} not found`);
        } 
        return dish;
    }

    async create(createDishDto: CreateDishDto) {
        return await this.dishModel.query().insert(createDishDto);
    }

    async update(id: string, updateDishDto: UpdateDishDto) {
        const dish = this.dishModel.query().findById(+id).patch(updateDishDto); 
        if (!dish) {
            throw new NotFoundError(`Dish #${id} not found`)
        }
        return dish;
    }

    async remove(id: string) {
        return await this.dishModel.query().deleteById(+id);
    }
}