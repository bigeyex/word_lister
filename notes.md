# load async with import fs

import fs from "react-native-fs";

fs.readFileAssets("folder/file", "base64") // 'base64' for binary 
  .then(binary => {
    // work with it
  })
  .catch(console.error)


# import async

import { Image } from 'react-native';
const {default: exampleImage } = await import('./assets/images/example.png')
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri
