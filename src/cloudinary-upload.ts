import { errors } from '@elastic/elasticsearch';
import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
// hvpBFLNDdvwMnKZYZDwMTwzUKUs


export function uploads(file: string, public_id?: string, overwrite?: boolean, invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                resource_type: "auto" // zip audio or image files
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (errors) resolve(error)
                resolve(result)
            }
        )
    })
}
export function videoUpload(file: string, public_id?: string, overwrite?: boolean, invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                chunk_size: 50000,
                resource_type: "video"
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (errors) resolve(error)
                resolve(result)
            }
        )
    })
}