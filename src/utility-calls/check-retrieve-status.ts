/**
 * @name check-retrieve-status.ts
 * @description checkRetrieveStatus
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.checkRetrieveStatus;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    asyncProcessId: config.id,
    includeZip: config.includeZip
  };
};

/**
 * @name checkRetrieveStatus
 * @description checks the status of the declarative metadata call retrieve() and returns the zip file contents.
 */
async function checkRetrieveStatus(authorization: authorization, config: any) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { checkRetrieveStatus };
