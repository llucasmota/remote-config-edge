import { validateConfig } from "./validator/validator.js";

/**
 * Remote Config Edge Platform
 * High-performance edge-distributed configuration engine for mobile banking.
 */
export const VERSION = '0.1.0';
const featureConfig = {
  minVersion: 1.0,
  enabled: true,
  path: "/app-mobile",
  userType: ["PF"]
}

validateConfig("featureConfig", featureConfig)