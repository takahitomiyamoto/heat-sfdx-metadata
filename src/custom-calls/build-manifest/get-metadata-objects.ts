/**
 * @name get-metadata-objects.ts
 * @description getMetadataObjects
 */
import { authorization } from 'heat-sfdx-common';
import { describeMetadata } from '../../utility-calls';

/**
 * @name getMetadataObjects
 * @description call describeMetadata() and get value of result.metadataObjects
 */
async function getMetadataObjects(authorization: authorization, config: any) {
  const metadata = await describeMetadata(authorization, config);

  return JSON.parse(metadata).result.metadataObjects;
}

export { getMetadataObjects };
