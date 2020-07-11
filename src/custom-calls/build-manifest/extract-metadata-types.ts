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
 * @name _extractMetadataTypes
 */
const _extractMetadataTypes = (params: any) => {
  const objects = params.metadataObjects;
  const metadataTypesObj = objects.filter(
    (object: any) => params.inFolder === object.inFolder
  );
  const metadataTypes = metadataTypesObj.map((object: any) =>
    _getXmlName(object, params.folder)
  );
  metadataTypes.sort();

  writeFileSyncUtf8(params.output, JSON.stringify(metadataTypes));
};

/**
 * @name extractMetadataTypes
 * @description extract metadataTypes from metadataObjects.
 */
const extractMetadataTypes = (params: any) => {
  if (
    !params.config.metadataTypesNoFolder ||
    !params.config.metadataTypesInFolder ||
    !params.config.metadataTypesFolder
  ) {
    console.error(
      'If you will call buildManifest(authorization, config), please add the parameter in config: metadataTypesNoFolder, metadataTypesInFolder, metadataTypesFolder'
    );
  }

  // no folder
  _extractMetadataTypes({
    metadataObjects: params.metadataObjects,
    output: params.config.metadataTypesNoFolder,
    inFolder: false,
    folder: false
  });

  // folder
  _extractMetadataTypes({
    metadataObjects: params.metadataObjects,
    output: params.config.metadataTypesFolder,
    inFolder: false,
    folder: true
  });

  // in folder
  _extractMetadataTypes({
    metadataObjects: params.metadataObjects,
    output: params.config.metadataTypesInFolder,
    inFolder: true,
    folder: false
  });
};

export { extractMetadataTypes };
