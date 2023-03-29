import { Prisma } from '@prisma/client';
import { excludedFields } from 'src/helper/helper.service';

export class CollegeInput
  implements Omit<Prisma.CollegeUncheckedCreateInput, excludedFields>
{
  name: string;
}
