import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Helper } from '../../helper/helper.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private helper: Helper,
  ) {}

  async getAllUsersFromCollege() {
    const user = this.helper.getToken();
    return await this.prisma.user.findMany({
      where: {
        collegeId: user.collegeId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        userRole: true,
        collegeId: true,
        userProfile: {
          select: {
            streamId: true,
          },
        },
      },
    });
  }
  async getUserProfile() {
    const user = this.helper.getToken();
    return await this.prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });
  }

  async updateUserProfile(body: Prisma.UserProfileUncheckedUpdateInput) {
    const user = this.helper.getToken();
    const data = await this.prisma.userProfile.update({
      where: {
        userId: user.id,
      },
      data: body,
    });
    return data;
  }
}
