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
  if (folder) {
    return METADATA_TYPE2FOLDER_MAP[object.xmlName];
  } else {
    return object.xmlName;
  }
};

/**
 * @name _getChildXmlNames
 */
const _getChildXmlNames = (object: any, folder: boolean) => {
  if (!object.childXmlNames) {
    return [];
  }
  return object.childXmlNames;
};

/**
 * @name _extractMetadataTypes
 */
const _extractMetadataTypes = (
  config: any,
  metadataObjects: any,
  path: string,
  inFolder: boolean,
  folder: boolean
) => {
  const objects = metadataObjects;
  const metadataTypesObj = objects.filter(
    (object: any) => inFolder === object.inFolder
  );

  // xmlName
  let metadataTypes = metadataTypesObj.map((object: any) =>
    _getXmlName(object, folder)
  );
  metadataTypes.sort();

  // childXmlNames
  let childMetadataTypes: any[] = [];
  if (config.child) {
    metadataTypesObj.forEach((object: any) => {
      childMetadataTypes = childMetadataTypes.concat(
        _getChildXmlNames(object, folder)
      );
    });
    metadataTypes = metadataTypes.concat(childMetadataTypes);
    metadataTypes.sort();
  }

  writeFileSyncUtf8(path, JSON.stringify(metadataTypes));
};

/**
 * @name extractMetadataTypesNoFolder
 * @description extractMetadataTypes (no folder)
 */
const extractMetadataTypesNoFolder = (metadataObjects: any, config: any) => {
  _extractMetadataTypes(
    config,
    metadataObjects,
    config.metadataTypesNoFolder,
    false,
    false
  );
};

/**
 * @name extractMetadataTypesFolder
 * @description extractMetadataTypes (folder)
 */
const extractMetadataTypesFolder = (metadataObjects: any, config: any) => {
  _extractMetadataTypes(
    config,
    metadataObjects,
    config.metadataTypesFolder,
    true,
    true
  );
};

/**
 * @name extractMetadataTypesInFolder
 * @description extractMetadataTypes (in folder)
 */
const extractMetadataTypesInFolder = (metadataObjects: any, config: any) => {
  _extractMetadataTypes(
    config,
    metadataObjects,
    config.metadataTypesInFolder,
    true,
    false
  );
};

/**
 * @name extractMetadataTypes
 * @description extract metadataTypes from metadataObjects.
 */
const extractMetadataTypes = (metadataObjects: any, config: any) => {
  // extractMetadataTypes (no folder)
  extractMetadataTypesNoFolder(metadataObjects, config);

  // extractMetadataTypes (folder)
  extractMetadataTypesFolder(metadataObjects, config);

  // extractMetadataTypes (in folder)
  extractMetadataTypesInFolder(metadataObjects, config);
};

export { extractMetadataTypes };
