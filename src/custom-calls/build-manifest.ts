/**
 * @name build-manifest.ts
 * @description buildManifest
 */
import { authorization } from 'heat-sfdx-common';
import { extractMetadataTypes } from './build-manifest/extract-metadata-types';
import { callListMetadata } from './build-manifest/call-list-metadata';
import { getMetadataObjects } from './build-manifest/get-metadata-objects';
import { createManifestFile } from './build-manifest/create-manifest-file';

/**
 * @name buildManifest
 * @description build manifest file
 */
async function buildManifest(authorization: authorization, config: any) {
  const metadataObjects = await getMetadataObjects(authorization, config);

  extractMetadataTypes({
    metadataObjects: metadataObjects,
    config: config
  });

  await callListMetadata({
    authorization: authorization,
    config: config
  });

  return createManifestFile(config);
}

export { buildManifest };
