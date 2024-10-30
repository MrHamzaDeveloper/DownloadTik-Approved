import { exec } from 'child_process';
import axios from 'axios';

const activeDownloads = new Set();

// Modify URL if necessary (change photo to video URL)
const modifyUrl = (url) => {
    return url.includes('/photo/') ? url.replace('/photo/', '/video/') : url;
};

// Resolve short TikTok URL (https://vt.tiktok.com)
const resolveShortUrl = async (url) => {
    try {
        const response = await axios.get(url, { maxRedirects: 5 });
        return response.request.res.responseUrl;
    } catch (error) {
        console.error(`Error resolving short URL: ${error.message}`);
        throw new Error('Failed to resolve short URL');
    }
};

// Helper function to format duration in mm:ss
const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Fetch file size with axios HEAD request
const fetchFileSize = async (url) => {
    try {
        const response = await axios.head(url);
        const fileSizeBytes = response.headers['content-length'];
        return fileSizeBytes ? (fileSizeBytes / (1024 * 1024)).toFixed(2) : '0.00';
    } catch (error) {
        console.error(`Error fetching file size: ${error.message}`);
        return '0.00';
    }
};

// Fetch captions, username, thumbnail, duration, and file size from the TikTok video
const fetchVideoInfo = async (url) => {
    return new Promise((resolve, reject) => {
        const command = `yt-dlp --dump-json "${url}"`;
        exec(command, async (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error.message}`);
                return reject(new Error('Failed to fetch metadata'));
            }
            try {
                const metadata = JSON.parse(stdout);
                
                const captions = metadata.description || '';
                const username = metadata.uploader || 'Unknown';
                const thumbnail = metadata.thumbnail || '';
                const duration = metadata.duration || 0;
                
                // File size check
                let fileSize = metadata.filesize 
                    ? (metadata.filesize / (1024 * 1024)).toFixed(2)
                    : metadata.filesize_approx 
                    ? (metadata.filesize_approx / (1024 * 1024)).toFixed(2)
                    : await fetchFileSize(metadata.url || url);

                resolve({
                    captions,
                    username,
                    thumbnail,
                    finalUrl: url,
                    duration: formatDuration(duration), // Formatted duration
                    fileSize
                });
            } catch (err) {
                reject(new Error('Failed to parse metadata'));
            }
        });
    });
};

// POST request handler
export async function POST(req) {
    try {
        const { url: videoUrl } = await req.json();

        // Reset previous error data
        // (If you have an error storage mechanism, clear it here)
        // For example, if using a global error object:
        // errorData = null; 

        if (!videoUrl) {
            return new Response(JSON.stringify({ error: 'No video URL provided' }), { status: 400 });
        }

        if (activeDownloads.has(videoUrl)) {
            return new Response(JSON.stringify({ error: 'This video is already being processed by another request' }), { status: 409 });
        }

        activeDownloads.add(videoUrl);

        let finalUrl;
        let isPhotoOrSlideshow = false;

        if (videoUrl.startsWith('https://vt.tiktok.com/')) {
            try {
                finalUrl = await resolveShortUrl(videoUrl);
            } catch (error) {
                activeDownloads.delete(videoUrl);
                return new Response(JSON.stringify({ error: 'Failed to resolve short URL' }), { status: 500 });
            }
        } else {
            finalUrl = videoUrl;
        }

        if (finalUrl.includes('/photo/')) {
            isPhotoOrSlideshow = true;
            finalUrl = modifyUrl(finalUrl);
        }

        const { captions, username, thumbnail, duration, fileSize } = await fetchVideoInfo(finalUrl);
        activeDownloads.delete(videoUrl);

        return new Response(JSON.stringify({
            username,
            captions,
            thumbnail,
            finalUrl,
            isPhotoOrSlideshow,
            duration,  // Formatted duration
            fileSize   // File size in MB
        }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
