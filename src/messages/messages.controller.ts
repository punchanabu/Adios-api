import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { MessagesService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('count-by-author')
  async countMessagesByAuthor(@Res() res: Response) {
    try {
      const data = await this.messagesService.countMessagesByAuthor();
      res.json(data);
    } catch (error) {
      console.error('Failed to count messages by author:', error);
      res
        .status(500)
        .json({ message: 'Failed to count messages by author', error });
    }
  }

  @Get('images')
  async getAllMessagesWithImages(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.messagesService.getAllMessagesWithImages(
        parseInt(page),
        parseInt(limit),
      );
      res.json(data);
    } catch (error) {
      console.error('Failed to fetch messages with images:', error);
      res
        .status(500)
        .json({ message: 'Failed to fetch messages with images', error });
    }
  }
}
