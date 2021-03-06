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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../core/auth/guards/jwt.guard';
import { DeliverPersonDto, UpdateDeliverPersonDto } from './deliver-person.dto';
import { DeliverPersonService } from './deliver-person.service';

@ApiTags('deliver-persons')
@UseGuards(JwtAuthGuard)
@Controller('deliver-persons')
export class DeliverPersonController {
  constructor(private deliverPersonService: DeliverPersonService) {}

  @Get()
  findAll() {
    return this.deliverPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliverPersonService.findOne(id);
  }

  @Post()
  create(@Body() deliverPersonDto: DeliverPersonDto) {
    return this.deliverPersonService.create(deliverPersonDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliverPersonDto: UpdateDeliverPersonDto,
  ) {
    return this.deliverPersonService.update(id, updateDeliverPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliverPersonService.remove(id);
  }
}
