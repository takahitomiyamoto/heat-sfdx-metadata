/**
 * @name extract-metadata-types.ts
 * @description extractMetadataTypes
 */
import { writeFileSyncUtf8 } from 'heat-sfdx-common';
import { METADATA_TYPE2FOLDER_MAP } from '../../common';

/**
 * @name _extractMetadataTypesNoFolder
 */
const _extractMetadataTypesNoFolder = (params: any) => {
  const objects = params.metadataObjects;
  const objectsNoFolder = objects.filter(
    (object: any) => false === object.inFolder
  );
  const metadataTypesNoFolder = objectsNoFolder.map(
    (object: any) => object.xmlName
  );
  metadataTypesNoFolder.sort();

  writeFileSyncUtf8(params.output, JSON.stringify(metadataTypesNoFolder));
};

/**
 * @name _extractMetadataTypesInFolder
 */
const _extractMetadataTypesInFolder = (params: any) => {
  const objects = params.metadataObjects;
  const objectsInFolder = objects.filter(
    (object: any) => true === object.inFolder
  );
  const metadataTypesInFolder = objectsInFolder.map(
    (object: any) => object.xmlName
  );
  metadataTypesInFolder.sort();

  writeFileSyncUtf8(params.output, JSON.stringify(metadataTypesInFolder));
};

/**
 * @name _extractMetadataTypesFolder
 */
const _extractMetadataTypesFolder = (params: any) => {
  const objects = params.metadataObjects;
  const objectsInFolder = objects.filter(
    (object: any) => true === object.inFolder
  );
  const metadataTypesFolder = objectsInFolder.map(
    (object: any) => METADATA_TYPE2FOLDER_MAP[object.xmlName]
  );
  metadataTypesFolder.sort();

  writeFileSyncUtf8(params.output, JSON.stringify(metadataTypesFolder));
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

  _extractMetadataTypesNoFolder({
    metadataObjects: params.metadataObjects,
    output: params.config.metadataTypesNoFolder
  });
  _extractMetadataTypesInFolder({
    metadataObjects: params.metadataObjects,
    output: params.config.metadataTypesInFolder
  });
  _extractMetadataTypesFolder({
    metadataObjects: params.metadataObjects,
    output: params.config.metadataTypesFolder
  });
};

export { extractMetadataTypes };
