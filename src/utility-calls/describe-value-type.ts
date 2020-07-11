/**
 * @name describe-value-type.ts
 * @description describeValueType
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { invoke, createClient } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.describeValueType;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    type: config.type
  };
};

/**
 * @name describeValueType
 * @description retrieves the metadata describing a given metadata type (value type).
 */
async function describeValueType(authorization: authorization, config: any) {
  const client = await createClient(authorization);
  const result: any = await invoke(_getMethod(client), _getArgs(config));
  return JSON.stringify(result);
}

export { describeValueType };
