import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ParseFilePipeBuilder,
  MaxFileSizeValidator,
  FileTypeValidator,
  Type,
} from '@nestjs/common';

/**
 * @description Creates a dynamic interceptor for single or multiple file uploads.
 * @param fieldName Field name used in form-data (e.g. 'file' or 'files')
 * @param destinationFolder Folder name inside ./uploads/
 * @param mode 'single' (default) or 'multiple'
 * @param maxCount Max files allowed (only for multiple)
 */
export function createFileInterceptorHelper(
  fieldName: string,
  destinationFolder: string,
  mode: 'single' | 'multiple' = 'single',
  maxCount = 5,
): Type<any> {
  const storage = diskStorage({
    destination: `./uploads/${destinationFolder}`,
    filename: (req, file, callback) => {
      // keep original file name
      callback(null, file.originalname);
    },
  });

  return mode === 'multiple'
    ? FilesInterceptor(fieldName, maxCount, { storage })
    : FileInterceptor(fieldName, { storage });
}

/**
 * @description File validation pipe (size + allowed types)
 */
export function createFileValidationPipe(
//   allowedTypes = /(image\/jpeg|image\/png|application\/pdf)/i,
//   maxSizeMB = 2,
) {
    // console.log('Allowed regex:', allowedTypes);
  return new ParseFilePipeBuilder()
    .addValidator(new FileTypeValidator({ fileType: 'image/jpeg',skipMagicNumbersValidation: true, }))
    // .addValidator(
    //   new MaxFileSizeValidator({ maxSize: maxSizeMB * 1024 * 1024 }),
    // )
    .build({
      errorHttpStatusCode: 422,
    });
}

