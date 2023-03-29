import { Injectable } from '@nestjs/common';

@Injectable()
export class Response {
  async Success(data: any) {
    return {
      success: true,
      version: '1.0',
      timestamp: new Date(),
      data,
    };
  }
  async Fail(data: any) {
    let message = data;
    if (!data) {
      message = 'Something went wrong';
    }
    return {
      error: message,
      success: false,
      version: '1.0',
      timestamp: new Date(),
    };
  }
}
