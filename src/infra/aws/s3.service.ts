import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import crypto from 'crypto';

@Injectable()
export class S3Service {
  private s3 = new S3();

  async uploadFileToS3(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: 'your-bucket-name',
      Key: `${crypto.randomUUID()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const { Location } = await this.s3.upload(params).promise();

    return Location;
  }
}
