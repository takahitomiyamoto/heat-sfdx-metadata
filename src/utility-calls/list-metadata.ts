/**
 * @name list-metadata.ts
 * @description listMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { invoke, createClient } from '../common';

/**
 * @name listMetadataQuery
 * @description ListMetadataQuery[]
 */
type listMetadataQuery = {
  type: string;
  folder?: string;
};

/**
 * @name listMetadataArg
 * @description Arguments
 */
type listMetadataArg = {
  queries: listMetadataQuery[];
  asOfVersion: number;
};

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.listMetadata;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  const queries: listMetadataQuery[] = [];
  const folder = config.folder;
  if (!folder) {
    queries.push({
      type: config.metadataType
    });
  } else {
    queries.push({
      type: config.metadataType,
      folder: folder
    });
  }
  const args: listMetadataArg = {
    queries: queries,
    asOfVersion: config.asOfVersion
  };

  return args;
};

/**
 * @name listMetadata
 * @description retrieves property information about metadata components in your organization.
 */
async function listMetadata(authorization: authorization, config: any) {
  const client = await createClient(authorization);
  const result: any = await invoke(_getMethod(client), _getArgs(config));
  return JSON.stringify(result);
}

export { listMetadata };
