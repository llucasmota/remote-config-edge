import { describe, it, expect } from 'vitest';
import { VERSION } from './index.js';
import { validateConfig } from './validator/validator.js';



const responseStringError = (field: string): string => {
  return `field 'featureConfig': must have required property ${field}`
}


describe('Remote Config Edge Entrypoint', () => {
  it('should export the initial version 0.1.0', () => {
    expect(VERSION).toBe('0.1.0');
  });
});

describe('Remote config: Feature Schema', () => {
  describe('when payload is valid', () => {
    it('should validate successfully when valid feature config is provided', () => {
      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 1.0,
        enabled: true,
        path: '/app-mobile',
        userType: ['PF']
      });

      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should pass validation when optional fields are present', () => {
      // TODO: Testar payload com 'oldPath' e múltiplos 'userType' (ex: ["PF", "PJ"])

      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 1.0,
        enabled: true,
        path: '/app-mobile',
        userType: ['PF', "PJ"],
        oldPath: "/dasdas"
      });

      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });
  });

  describe('when payload is missing required fields', () => {
    it('should fail when "minVersion" is missing', () => {
      // TODO: Testar payload sem 'minVersion'
      const { isValid, errors } = validateConfig('featureConfig', {
        enabled: true,
        path: '/app-mobile',
        userType: ['PF', "PJ"],
        oldPath: "/dasdas"
      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'featureConfig': must have required property 'minVersion'");

    });

    it('should fail when "enabled" is missing', () => {
      // TODO: Testar payload sem 'enabled'
      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 1.0,
        path: '/app-mobile',
        userType: ['PF', "PJ"],
        oldPath: "/dasdas"
      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'featureConfig': must have required property 'enabled'");
    });

    it('should fail when "path" is missing', () => {
      // TODO: Testar payload sem 'path'
      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 1.0,
        enabled: true,
        userType: ['PF', "PJ"],
        oldPath: "/dasdas"
      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'featureConfig': must have required property 'path'");
    });

    it('should fail when "userType" is missing', () => {
      // TODO: Testar payload sem 'userType'
      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 1.0,
        enabled: true,
        path: '',
        oldPath: "/dasdas"
      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'featureConfig': must have required property 'userType'");
    });
  });

  describe('when payload has invalid types or constraints', () => {
    it('should fail when "minVersion" is lower than minimum allowed', () => {
      // TODO: Testar 'minVersion' com valor menor que 1.0 (ex: 0.5)
      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 0.5,
        enabled: true,
        path: '',
        oldPath: "/dasdas",
        userType: ['PF'],

      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field '/minVersion': must be >= 1");
    });

    it('should fail when "userType" contains invalid enum values', () => {
      // TODO: Testar 'userType' com valor fora do enum (ex: ["ADMIN"])
      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 1.0,
        enabled: true,
        path: '',
        oldPath: "/dasdas",
        userType: ['JohnDoe',],

      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field '/userType/0': must be equal to one of the allowed values");
    });

    it('should fail when "userType" contains duplicate items', () => {
      // TODO: Testar 'userType' violando uniqueItems (ex: ["PF", "PF"])
      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: 1.0,
        enabled: true,
        path: '',
        oldPath: "/dasdas",
        userType: ['JohnDoe', 'PG'],

      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(2);
      expect(errors).toContain("field '/userType/0': must be equal to one of the allowed values");
      expect(errors).toContain("field '/userType/1': must be equal to one of the allowed values")
    });

    it('should fail when field types do not match the schema', () => {
      // TODO: Testar com tipos incompatíveis (ex: enabled como string ou minVersion como texto)

      const { isValid, errors } = validateConfig('featureConfig', {
        minVersion: '1.0',
        enabled: 0,
        path: true,
        oldPath: "/dasdas",
        userType: [1, 2], // two bugs per item

      });
      console.log(`❌ here is the error: ${errors?.toString()}`)

      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(7);
    });
  });
});

describe('when namespace is unknown', () => {
  it('should fail when an unregistered namespace is passed', () => {
    // TODO: Testar chamada com namespace inexistente (ex: "unknownNamespace")
  });
});
