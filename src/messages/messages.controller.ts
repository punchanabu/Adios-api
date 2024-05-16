import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Controller('messages')
export class MessagesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.message.findMany();
  }

  @Post()
  async create(@Body() createMessageDto: any) {
    return this.prisma.message.create({
      data: createMessageDto,
    });
  }
}
