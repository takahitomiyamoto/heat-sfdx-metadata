/**
 * @name deploy-recent-validation.ts
 * @description deployRecentValidation
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.deployRecentValidation;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    validationId: config.validationID
  };
};

/**
 * @name deployRecentValidation
 * @description deploys a recently validated component set without running Apex tests.
 */
async function deployRecentValidation(
  authorization: authorization,
  config: any
) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { deployRecentValidation };
