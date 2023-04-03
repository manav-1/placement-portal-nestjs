import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Helper } from '../../helper/helper.service';
import { CollegeInput } from './dto/college.dto';

@Injectable()
export class CollegeService {
  constructor(private prisma: PrismaService, private helper: Helper) {}

  async createCollege(body: CollegeInput) {
    return this.prisma.college.create({
      data: body,
    });
  }
  async getAllCollege() {
    return this.prisma.college.findMany();
  }
}
