import { Opportunity, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Helper } from '../../helper/helper.service';
import { ApplicationInput } from './entities/opportunity.dto';

@Injectable()
export class OpportunityService {
  constructor(private prisma: PrismaService, private helper: Helper) {}

  async getAllOpportunities(): Promise<Opportunity[]> {
    const { collegeId, id: userId } = this.helper.getToken();
    const { streamId } = await this.prisma.userProfile.findUnique({
      where: {
        userId,
      },
      select: {
        streamId: true,
      },
    });

    return await this.prisma.opportunity.findMany({
      where: {
        collegeId,
        OpportunityStreamLink: {
          every: {
            streamId: streamId,
          },
        },
      },
    });
  }

  async addOpportunity(body: Prisma.OpportunityUncheckedCreateInput) {
    return body;
  }
  async applyOpportunity(body: ApplicationInput) {
    const { opportunityId } = body;
    const { id: userId } = this.helper.getToken();
    const data = await this.prisma.opportunityUserLink.create({
      data: {
        opportunityId,
        userId,
      },
      include: {
        opportunity: true,
        user: {
          include: {
            userProfile: true,
          },
        },
      },
    });
    return data;
  }
}
