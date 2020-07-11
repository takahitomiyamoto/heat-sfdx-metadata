/**
 * @name deploy-recent-validation.ts
 * @description deployRecentValidation
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { invoke, createClient } from '../common';

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
  const client = await createClient(authorization);
  const result: any = await invoke(_getMethod(client), _getArgs(config));
  return JSON.stringify(result);
}

export { deployRecentValidation };
