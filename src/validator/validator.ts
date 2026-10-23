import { Ajv, type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import featureConfig from '../schemas/feature-config.json' with { type: 'json' };

// 
const ajv = new Ajv({ allErrors: true, strict: true });

// add formats
addFormats.default(ajv);

// 3. Schema compiler
const validators = new Map<string, ValidateFunction>([
  ['featureConfig', ajv.compile(featureConfig)]
])

export function validateConfig(namespace: string, data: unknown): { isValid: boolean, errors?: string[] } {
  const validator = validators.get(namespace);

  if (!validator) {

    return {
      isValid: false,
      errors: [`Unknown namespace: "${namespace}". Available Schemas: ${Array.from(validators.keys()).join(', ')}`]
    }
  }

  const isValid = validator(data);

  if (isValid) {

    return { isValid: true }
  }

  const formattedErrors = (validator.errors ?? []).map(err => {
    const field = err.instancePath ? err.instancePath : `${namespace}`;
    return `field '${field}': ${err.message}`;
  })



  return {
    isValid: false,
    errors: formattedErrors
  }
}
