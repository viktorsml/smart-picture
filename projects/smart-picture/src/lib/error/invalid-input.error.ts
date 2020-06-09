export class InvalidInputError extends Error {
  constructor(message: string, providedValue: any, validValues?: string[]) {
    const providedValueMessage = `\n\n-> Provided value: ${providedValue} | type: ${typeof providedValue}\n`;
    const validValuesMessage = validValues ? `\n-> Valid values: ${validValues}\n` : '';
    const fullMessage = message + providedValueMessage + validValuesMessage;
    super(fullMessage);
    this.name = 'InvalidInputError';
  }
}
