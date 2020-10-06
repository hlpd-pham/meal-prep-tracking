import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateDishDto, UpdateDishDto } from "./dish.dto";
import { DishService } from "./dish.service";

@Controller('dishes')
export class DishController {
    constructor(private dishService: DishService) {}

    @Get()
    findAll() {
        return this.dishService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dishService.findOne(id);
    }

    @Post()
    create(@Body() createDishDto: CreateDishDto) {
        return this.dishService.create(createDishDto);
    }

    @Patch(':id')
    update(@Param(':id') id: string, @Body() updateDishDto: UpdateDishDto) {
        return this.dishService.update(id, updateDishDto);
    }

    @Delete(':id')
    remove(@Param(':id') id: string) {
        return this.dishService.remove(id)
    }
}