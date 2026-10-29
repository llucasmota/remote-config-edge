import { describe, expect, it } from 'vitest';
import { v5 as uuidv5 } from 'uuid';
import { validateConfig } from './validator/validator';

const NAMESPACE = 'fa6e266e-ee9c-58e2-bbc0-d57f51ae39a3';

const createUUID = (text: string) => {
  return uuidv5(text, NAMESPACE);
};

export type UserType = 'PF' | 'PJ';

export interface MenuIcon {
  name: string;
  path: string;
}

export interface MenuConfig {
  id: string;
  title: string;
  minVersion: number;
  enabled: boolean;
  path: string;
  userType: UserType[];
  icon: MenuIcon;
}

describe('Remote Config: Menu Schema (menu-config.json)', () => {
  describe('when payload is valid (happy path)', () => {
    it('should pass validation when a valid menu config payload is provided', async () => {
      let title = "checkout";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://checkout",
        userType: ['PF', 'PJ'],
        icon: { name: 'cart', path: 'cart-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should pass validation when userType contains only ["PF"]', () => {
      let title = "userTypePF";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://typepf",
        userType: ['PF'],
        icon: { name: 'pf', path: 'pf-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should pass validation when userType contains only ["PJ"]', () => {
      let title = "userTypePJ";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://typepj",
        userType: ['PJ'],
        icon: { name: 'pf', path: 'pj-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should pass validation when userType contains both ["PF", "PJ"]', () => {
      let title = "userTypeBoth";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://typeboth",
        userType: ['PJ', 'PF'],
        icon: { name: 'pf', path: 'both-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });
  });

  describe('when payload is missing required fields', () => {
    it('should fail validation when "id" is missing', () => {
      let title = "withoutID";
      const menu = {
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://withoutid",
        userType: ['PJ'],
        icon: { name: 'pf', path: 'withoutdi-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'id'");
    });

    it('should fail validation when "title" is missing', () => {
      let title = "withoutTitle";
      const menu = {
        id: createUUID(title),
        minVersion: 1.0,
        enabled: true,
        path: "bank://withoutid",
        userType: ['PJ'],
        icon: { name: 'pf', path: 'withoutdi-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'title'");
    });

    it('should fail validation when "minVersion" is missing', () => {
      let title = "withoutMinVersion";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        enabled: true,
        path: "bank://withoutid",
        userType: ['PJ'],
        icon: { name: 'pf', path: 'withoutdi-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'minVersion'");
    });

    it('should fail validation when "enabled" is missing', () => {
      let title = "withoutEnabled";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        minVersion: 1.0,
        path: "bank://withoutid",
        userType: ['PJ'],
        icon: { name: 'pf', path: 'withoutdi-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'enabled'");
    });

    it('should fail validation when "path" is missing', () => {
      let title = "withoutPath";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        minVersion: 1.0,
        enabled: true,
        userType: ['PJ'],
        icon: { name: 'pf', path: 'withoutdi-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'path'");
    });

    it('should fail validation when "userType" is missing', () => {
      let title = "withoutUserType";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        minVersion: 1.0,
        enabled: true,
        path: "bank://withoutid",
        icon: { name: 'pf', path: 'withoutdi-icon' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'userType'");
    });

    it('should fail validation when "icon" is missing', () => {
      let title = "withoutIcon";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        minVersion: 1.0,
        enabled: true,
        path: "bank://withoutid",
        userType: ['PF']
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'icon'");
    });
  });

  describe('when payload contains additional properties (additionalProperties: false)', () => {
    it('should fail validation when unrecognized properties are present at root level', () => {
      let title = "rootAdditionalProps";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        minVersion: 1.0,
        enabled: true,
        path: "bank://withoutid",
        userType: ['PF'],
        icon: { name: 'pf', path: 'withoutdi-icon' },
        teste: 'dasdas'
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must NOT have additional properties");
    });

    it('should fail validation when unrecognized properties are present inside "icon" object', () => {
      let title = "iconAdditionalProps";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        minVersion: 1.0,
        enabled: true,
        path: "bank://withoutid",
        userType: ['PF'],
        icon: { name: 'pf', path: 'withoutdi-icon', extraField: 'notAllowed' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field '/icon': must NOT have additional properties");
    });
  });

  describe('field validation: "id"', () => {
    it('should pass validation when "id" is a valid UUID format', () => {
      let title = "validUUID";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://validid",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should fail validation when "id" does not match the UUID pattern', () => {
      let title = "invalidUUIDPattern";
      const menu = {
        id: '1234-invalid-uuid',
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://invalidid",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain('field \'/id\': must match pattern "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-5[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"');
    });

    it('should fail validation when "id" is not a string', () => {
      let title = "nonStringId";
      const menu = {
        id: 123456,
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://invalidid",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/id': must be string");
    });
  });

  describe('field validation: "title"', () => {
    it('should pass validation when "title" is a string', () => {
      let title = "validTitle";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://validtitle",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should fail validation when "title" is not a string', () => {
      let title = "nonStringTitle";
      const menu = {
        id: createUUID(title),
        title: 12345,
        minVersion: 1.0,
        enabled: true,
        path: "bank://invalidtitle",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/title': must be string");
    });
  });

  describe('field validation: "minVersion"', () => {
    it('should pass validation when "minVersion" is equal to or greater than 1.0', () => {
      let title = "validMinVersion";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.5,
        enabled: true,
        path: "bank://validminversion",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should fail validation when "minVersion" is lower than 1.0 (e.g. 0.9, 0, negative)', () => {
      let title = "lowerMinVersion";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 0.9,
        enabled: true,
        path: "bank://lowminversion",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/minVersion': must be >= 1");
    });

    it('should fail validation when "minVersion" is not a number', () => {
      let title = "nonNumberMinVersion";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: "1.0",
        enabled: true,
        path: "bank://stringminversion",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/minVersion': must be number");
    });
  });

  describe('field validation: "enabled"', () => {
    it('should pass validation when "enabled" is true or false', () => {
      let title = "validEnabled";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: false,
        path: "bank://validenabled",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should fail validation when "enabled" is not a boolean', () => {
      let title = "nonBooleanEnabled";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: "true",
        path: "bank://invalidenabled",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/enabled': must be boolean");
    });
  });

  describe('field validation: "path"', () => {
    it('should pass validation when "path" follows the deep link pattern "bank://[a-z0-9_/]+"', () => {
      let title = "validPath";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://pix/transfer_123",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should fail validation when "path" does not start with "bank://"', () => {
      let title = "invalidPathScheme";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "https://pix/transfer",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain('field \'/path\': must match pattern "bank://[a-z0-9_/]+$"');
    });

    it('should fail validation when "path" contains uppercase letters, spaces or special symbols', () => {
      let title = "invalidPathCharacters";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://Pix Transfer!",
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain('field \'/path\': must match pattern "bank://[a-z0-9_/]+$"');
    });

    it('should fail validation when "path" is not a string', () => {
      let title = "nonStringPath";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: 12345,
        userType: ['PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/path': must be string");
    });
  });

  describe('field validation: "userType"', () => {
    it('should fail validation when "userType" contains values outside enum ["PF", "PJ"]', () => {
      let title = "invalidUserTypeEnum";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://invalidusertype",
        userType: ['ADMIN'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/userType/0': must be equal to one of the allowed values");
    });

    it('should fail validation when "userType" contains duplicate items', () => {
      let title = "duplicateUserType";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://duplicateusertype",
        userType: ['PF', 'PF'],
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/userType': must NOT have duplicate items (items ## 1 and 0 are identical)");
    });

    it('should fail validation when "userType" is not an array', () => {
      let title = "nonArrayUserType";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://nonarrayusertype",
        userType: 'PF',
        icon: { name: 'icon', path: 'icon-path' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/userType': must be array");
    });
  });

  describe('field validation: "icon"', () => {
    it('should pass validation when "icon" has valid "name" and "path" strings', () => {
      let title = "validIcon";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://validicon",
        userType: ['PF'],
        icon: { name: 'home', path: 'assets/icons/home.png' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });

    it('should fail validation when "icon" is missing "name"', () => {
      let title = "missingIconName";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://missingiconname",
        userType: ['PF'],
        icon: { path: 'assets/icons/home.png' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/icon': must have required property 'name'");
    });

    it('should fail validation when "icon" is missing "path"', () => {
      let title = "missingIconPath";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://missingiconpath",
        userType: ['PF'],
        icon: { name: 'home' }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/icon': must have required property 'path'");
    });

    it('should fail validation when "icon.name" or "icon.path" is not a string', () => {
      let title = "invalidIconTypes";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://invalidicontypes",
        userType: ['PF'],
        icon: { name: 123, path: true }
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/icon/name': must be string");
      expect(errors).toContain("field '/icon/path': must be string");
    });

    it('should fail validation when "icon" is not an object', () => {
      let title = "nonObjectIcon";
      const menu = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://nonobjecticon",
        userType: ['PF'],
        icon: "home-icon"
      };

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toContain("field '/icon': must be object");
    });
  });
});
