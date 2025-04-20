/**
 * Calculate download time for a file based on file size and internet speed
 * @param fileSize File size in GB
 * @param connectionSpeed Connection speed in Mbps
 * @returns Formatted download time string
 */
export function calculateDownloadTime(fileSize: number, connectionSpeed: number): string {
  // Convert GB to Gbits (multiply by 8)
  const fileSizeInGbits = fileSize * 8;
  
  // Convert Mbps to Gbps (divide by 1000)
  const speedInGbps = connectionSpeed / 1000;
  
  // Calculate download time in seconds
  const downloadTimeInSeconds = fileSizeInGbits / speedInGbps;
  
  // Format time
  if (downloadTimeInSeconds >= 3600) {
    const hours = Math.floor(downloadTimeInSeconds / 3600);
    const minutes = Math.floor((downloadTimeInSeconds % 3600) / 60);
    return `${hours} jam ${minutes} menit`;
  } else if (downloadTimeInSeconds >= 60) {
    const minutes = Math.floor(downloadTimeInSeconds / 60);
    const seconds = Math.floor(downloadTimeInSeconds % 60);
    return `${minutes} menit ${seconds} detik`;
  } else {
    return `${downloadTimeInSeconds.toFixed(1)} detik`;
  }
}
