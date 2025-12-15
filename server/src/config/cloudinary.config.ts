import { ForbiddenException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// delete file
const deleteFile = async (publicId: string) => {
  try {
    // Set 'resource_type' if it's a video or raw file; default is 'image'
    const result = (await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image', // Use 'video' for videos/audio, 'raw' for others
      invalidate: true, // Optional: invalidates cached copies on the CDN
    })) as unknown as { result: string };

    console.log('Cloudinary delete result:', result);

    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new ForbiddenException(
        `Failed to delete file with public ID: ${publicId}`,
      );
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new ForbiddenException(
      `Error deleting file with public ID: ${publicId}`,
    );
  }
};

export { cloudinary, deleteFile };
