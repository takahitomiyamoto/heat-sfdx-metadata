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
  return client.MetadataService.Metadata.describeMetadata;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    asOfVersion: config.apiVersion
  };
};

/**
 * @name describeMetadata
 * @description retrieves the metadata that describes your organization.
 */
async function describeMetadata(authorization: authorization, config: any) {
  return await callFunction(authorization, config, _getMethod, _getArgs);
}

export { describeMetadata };
