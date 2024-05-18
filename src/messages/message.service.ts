import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.message.findMany();
  }

  async create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: createMessageDto,
    });
  }

  async getAllMessagesWithImages(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    try {
      const total = await this.prisma.message.count({
        where: { imageUrl: { not: null } }
      });

      const messagesWithImages = await this.prisma.message.findMany({
        where: { imageUrl: { not: null } },
        skip,
        take: limit,
      });

      return {
        data: messagesWithImages,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Failed to fetch messages with images', error);
      throw new Error('Failed to fetch message with images');
    }
  }

  async countMessagesByAuthor() {
    const messageCounts = await this.prisma.message.groupBy({
      by: ['author'],
      where: {
        imageUrl: { not: null },
      },
      _count: {
        _all: true,
      },
    });

    return messageCounts.reduce((acc, { author, _count }) => {
      acc[author] = _count._all;
      return acc;
    }, {});
  }
}
