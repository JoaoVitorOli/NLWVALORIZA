export class CustomError {
  constructor(statusCode = 400, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public readonly message: string;
  public readonly statusCode: number;
}