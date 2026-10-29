import { describe, expect, it } from 'vitest';
import { v5 as uuidv5 } from 'uuid';
import { validateConfig } from './validator/validator';

const NAMESPACE = 'fa6e266e-ee9c-58e2-bbc0-d57f51ae39a3'

const createUUID = (text: string) => {
  return uuidv5(text, NAMESPACE);
}



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
      }

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
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
      }

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
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
      }

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
    });
    it.todo('should pass validation when userType contains both ["PF", "PJ"]', () => {
      let title = "userTypeBoth";
      const menu: MenuConfig = {
        id: createUUID(title),
        title,
        minVersion: 1.0,
        enabled: true,
        path: "bank://typeboth",
        userType: ['PJ', 'PF'],
        icon: { name: 'pf', path: 'both-icon' }
      }

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(true);
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
      }

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
      }

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'title'");
    });
    it.todo('should fail validation when "minVersion" is missing', () => {
      let title = "withoutMinVersion";
      const menu = {
        id: createUUID(title),
        title: "dasdsa",
        enabled: true,
        path: "bank://withoutid",
        userType: ['PJ'],
        icon: { name: 'pf', path: 'withoutdi-icon' }
      }

      const { isValid, errors } = validateConfig('menuConfig', menu);
      expect(isValid).toBe(false);
      expect(errors).toBeInstanceOf(Array);
      expect(errors).toHaveLength(1);
      expect(errors).toContain("field 'menuConfig': must have required property 'minVersion'");
    });
  });
  it('should fail validation when "enabled" is missing', () => {
    let title = "withoutMinVersion";
    const menu = {
      id: createUUID(title),
      title: "dasdsa",
      minVersion: 1.0,
      path: "bank://withoutid",
      userType: ['PJ'],
      icon: { name: 'pf', path: 'withoutdi-icon' }
    }

    const { isValid, errors } = validateConfig('menuConfig', menu);
    expect(isValid).toBe(false);
    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(1);
    expect(errors).toContain("field 'menuConfig': must have required property 'enabled'");
  });
  it('should fail validation when "path" is missing', () => {
    let title = "withoutMinVersion";
    const menu = {
      id: createUUID(title),
      title: "dasdsa",
      minVersion: 1.0,
      enabled: true,
      userType: ['PJ'],
      icon: { name: 'pf', path: 'withoutdi-icon' }
    }

    const { isValid, errors } = validateConfig('menuConfig', menu);
    expect(isValid).toBe(false);
    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(1);
    expect(errors).toContain("field 'menuConfig': must have required property 'path'");
  });
  it('should fail validation when "userType" is missing', () => {
    let title = "withoutMinVersion";
    const menu = {
      id: createUUID(title),
      title: "dasdsa",
      minVersion: 1.0,
      enabled: true,
      path: "bank://withoutid",
      icon: { name: 'pf', path: 'withoutdi-icon' }
    }

    const { isValid, errors } = validateConfig('menuConfig', menu);
    expect(isValid).toBe(false);
    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(1);
    expect(errors).toContain("field 'menuConfig': must have required property 'userType'");
  });
  it('should fail validation when "icon" is missing', () => {
    let title = "withoutMinVersion";
    const menu = {
      id: createUUID(title),
      title: "dasdsa",
      minVersion: 1.0,
      enabled: true,
      path: "bank://withoutid",
      userType: ['PF'],
    }

    const { isValid, errors } = validateConfig('menuConfig', menu);
    expect(isValid).toBe(false);
    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(1);
    expect(errors).toContain("field 'menuConfig': must have required property 'icon'");
  });
});

describe('when payload contains additional properties (additionalProperties: false)', () => {
  it('should fail validation when unrecognized properties are present at root level', () => {
    let title = "withoutMinVersion";
    const menu = {
      id: createUUID(title),
      title: "dasdsa",
      minVersion: 1.0,
      enabled: true,
      path: "bank://withoutid",
      userType: ['PF'],
      icon: { name: 'pf', path: 'withoutdi-icon' },
      teste: 'dasdas'

    }

    const { isValid, errors } = validateConfig('menuConfig', menu);
    expect(isValid).toBe(false);
    expect(errors).toBeInstanceOf(Array);
    expect(errors).toHaveLength(1);
    expect(errors).toContain("field 'menuConfig': must NOT have additional properties");
  });
  it.todo('should fail validation when unrecognized properties are present inside "icon" object');
});

describe('field validation: "id"', () => {
  it.todo('should pass validation when "id" is a valid UUID format');
  it.todo('should fail validation when "id" does not match the UUID pattern');
  it.todo('should fail validation when "id" is not a string');
});

describe('field validation: "title"', () => {
  it.todo('should pass validation when "title" is a string');
  it.todo('should fail validation when "title" is not a string');
});

describe('field validation: "minVersion"', () => {
  it.todo('should pass validation when "minVersion" is equal to or greater than 1.0');
  it.todo('should fail validation when "minVersion" is lower than 1.0 (e.g. 0.9, 0, negative)');
  it.todo('should fail validation when "minVersion" is not a number');
});

describe('field validation: "enabled"', () => {
  it.todo('should pass validation when "enabled" is true or false');
  it.todo('should fail validation when "enabled" is not a boolean');
});

describe('field validation: "path"', () => {
  it.todo('should pass validation when "path" follows the deep link pattern "bank://[a-z0-9_/]+"');
  it.todo('should fail validation when "path" does not start with "bank://"');
  it.todo('should fail validation when "path" contains uppercase letters, spaces or special symbols');
  it.todo('should fail validation when "path" is not a string');
});

describe('field validation: "userType"', () => {
  it.todo('should fail validation when "userType" contains values outside enum ["PF", "PJ"]');
  it.todo('should fail validation when "userType" contains duplicate items');
  it.todo('should fail validation when "userType" is not an array');
});

describe('field validation: "icon"', () => {
  it.todo('should pass validation when "icon" has valid "name" and "path" strings');
  it.todo('should fail validation when "icon" is missing "name"');
  it.todo('should fail validation when "icon" is missing "path"');
  it.todo('should fail validation when "icon.name" or "icon.path" is not a string');
  it.todo('should fail validation when "icon" is not an object');
});


