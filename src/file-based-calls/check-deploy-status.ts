/**
 * @name check-deploy-status.ts
 * @description checkDeployStatus
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.checkDeployStatus;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    asyncProcessId: config.id,
    includeDetails: config.includeDetails
  };
};

/**
 * @name checkDeployStatus
 * @description checks the status of declarative metadata call deploy().
 */
async function checkDeployStatus(authorization: authorization, config: any) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { checkDeployStatus };
