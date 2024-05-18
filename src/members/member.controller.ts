import { Controller, Get, Res } from '@nestjs/common';
import { MemberService } from './member.service';
import { Response } from 'express';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getMembers(@Res() res: Response) {
    try {
      const members = await this.memberService.getMembers();
      res.json(members);
    } catch (error) {
      console.error('Failed to fetch guild members:', error);
      res.status(500).json({ error: 'Failed to fetch guild members' });
    }
  }
}
