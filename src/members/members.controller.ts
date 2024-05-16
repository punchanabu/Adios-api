import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('api')
export class MembersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('members')
  async findAll() {
    return this.prisma.member.findMany();
  }
}
