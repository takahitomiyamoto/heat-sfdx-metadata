/**
 * @name check-deploy-status.ts
 * @description checkDeployStatus
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { invoke, createClient } from '../common';

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
  const client = await createClient(authorization);
  const result: any = await invoke(_getMethod(client), _getArgs(config));
  return JSON.stringify(result);
}

export { checkDeployStatus };
