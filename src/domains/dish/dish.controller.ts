import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { DishDto, UpdateDishDto } from './../dish/dish.dto';
import { DishService } from './../dish/dish.service';

@ApiTags('dishes')
@UseGuards(AuthGuard())
@Controller('dishes')
export class DishController {
  constructor(private dishService: DishService) {}

  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(id);
  }

  @Post()
  create(@Body() dishDto: DishDto) {
    return this.dishService.create(dishDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(id, updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishService.remove(id);
  }
}
