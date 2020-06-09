export class InvalidAspectRatioError extends Error {
  constructor(widthRatio: any, heightRatio: any) {
    super(`Please provide a valid number above 0 for the properties 'heightRatio' and 'widthRatio'.
    Values provided:\n
    -> widthRatio: ${widthRatio} (${typeof widthRatio})\n
    -> heightRatio: ${heightRatio} (${typeof heightRatio})`);
    this.name = 'InvalidInputError';
  }
}
