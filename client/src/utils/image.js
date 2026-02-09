// Small helper to request lighter Cloudinary images on the client.
// If the URL looks like a Cloudinary delivery URL, insert a transformation
// segment with automatic format, quality, and width. Otherwise return as-is.
export function optimizeCloudinary(url, { width = 600, quality = 60 } = {}) {
  try {
    if (!url || typeof url !== 'string') return url;
    const uploadSeg = '/upload/';
    const idx = url.indexOf(uploadSeg);
    if (idx === -1) return url;
    const prefix = url.slice(0, idx + uploadSeg.length);
    const suffix = url.slice(idx + uploadSeg.length);
    // Avoid duplicating transforms if already present
    const hasTransform = /f_\w+|q_\d+|w_\d+/.test(suffix.split('/')[0]);
    const transform = `f_auto,q_${quality},w_${width}`;
    return prefix + (hasTransform ? suffix : `${transform}/` + suffix);
  } catch {
    return url;
  }
}

// Convenience: pick width by container size hint
export function getImageWidthHint(size) {
  // size can be 'thumb' | 'card' | 'detail'
  switch (size) {
    case 'thumb': return 300;
    case 'card': return 600;
    case 'detail': return 1000;
    default: return 600;
  }
}