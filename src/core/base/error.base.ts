/* eslint-disable @typescript-eslint/no-explicit-any */
export class BadRequestException extends Error {
  public statusCode: any;

  public constructor(message: string) {
    super(message);

    this.statusCode = 400;
  }
}
