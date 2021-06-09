/**
 * @name extract-metadata-types.ts
 * @description extractMetadataTypes
 */
import { writeFileSyncUtf8 } from 'heat-sfdx-common';
import { METADATA_TYPE2FOLDER_MAP } from '../../common';

/**
 * @name _getXmlName
 */
const _getXmlName = (object: any, folder: boolean) => {
  console.log('');
  console.log('-------------------------');
  console.log('extract-metadata-types.ts');
  console.log(JSON.stringify(object));
  if (folder) {
    return METADATA_TYPE2FOLDER_MAP[object.xmlName];
  } else {
    return object.xmlName;
  }
};

/**
 * @name _extractMetadataTypes
 */
const _extractMetadataTypes = (
  metadataObjects: any,
  path: string,
  inFolder: boolean,
  folder: boolean
) => {
  const objects = metadataObjects;
  const metadataTypesObj = objects.filter(
    (object: any) => inFolder === object.inFolder
  );
  const metadataTypes = metadataTypesObj.map((object: any) =>
    _getXmlName(object, folder)
  );
  metadataTypes.sort();

  writeFileSyncUtf8(path, JSON.stringify(metadataTypes));
};

/**
 * @name extractMetadataTypes
 * @description extract metadataTypes from metadataObjects.
 */
const extractMetadataTypes = (metadataObjects: any, config: any) => {
  // extractMetadataTypes (no folder)
  _extractMetadataTypes(
    metadataObjects,
    config.metadataTypesNoFolder,
    false,
    false
  );

  // extractMetadataTypes (folder)
  _extractMetadataTypes(
    metadataObjects,
    config.metadataTypesFolder,
    true,
    true
  );

  // extractMetadataTypes (in folder)
  _extractMetadataTypes(
    metadataObjects,
    config.metadataTypesInFolder,
    true,
    false
  );
};

export { extractMetadataTypes };
