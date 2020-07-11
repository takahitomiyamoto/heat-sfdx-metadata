/**
 * @name describe-metadata.ts
 * @description describeMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.cancelDeploy;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    String: config.id
  };
};

/**
 * @name cancelDeploy
 * @description cancels a deployment that hasn’t completed yet.
 */
async function cancelDeploy(authorization: authorization, config: any) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { cancelDeploy };
