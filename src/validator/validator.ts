import { Ajv, type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import featureSchema from '../schemas/feature-schema.json' with { type: 'json' };

// 
const ajv = new Ajv({ allErrors: true, strict: true });

// add formats
addFormats.default(ajv);

// 3. Schema compiler
const validators = new Map<string, ValidateFunction>([
  ['featureSchema', ajv.compile(featureSchema)]
])

export function validateConfig(namespace: string, data: unknown): { isValid: boolean, errors?: string[] } {
  const validator = validators.get(namespace);

  if (!validator) {
    console.log(`⚠️ Data is not a valid schema: namespace: ${namespace}`)
    return {
      isValid: false,
      errors: [`Unknown namespace: "${namespace}". Available Schemas: ${Array.from(validators.keys()).join(', ')}`]
    }
  }

  const isValid = validator(data);

  if (isValid) {
    console.log(`✅ Schema sent is valid: namespace: ${namespace}`)

    return { isValid: true }
  }

  const formattedErrors = (validator.errors ?? []).map(err => {
    const field = err.instancePath ? err.instancePath : `${namespace}`;
    return `field '${field}': ${err.message}`;
  })

  console.log(`❌ Schema hasn't approved in format validation: ${namespace}`)

  return {
    isValid: false,
    errors: formattedErrors
  }
}
