import { execFile } from 'child_process';
import axios from 'axios';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const activeDownloads = new Set();

// Modify URL if necessary (change photo to video URL)
const modifyUrl = (url) => url.includes('/photo/') ? url.replace('/photo/', '/video/') : url;

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
    try {
        const { stdout } = await execFileAsync('yt-dlp', ['--dump-json', url]);
        const metadata = JSON.parse(stdout);

        const captions = metadata.description || '';
        const username = metadata.uploader || 'Unknown';
        const thumbnail = metadata.thumbnail || '';
        const duration = metadata.duration || 0;

        // File size check
        const fileSize = metadata.filesize
            ? (metadata.filesize / (1024 * 1024)).toFixed(2)
            : metadata.filesize_approx
            ? (metadata.filesize_approx / (1024 * 1024)).toFixed(2)
            : await fetchFileSize(metadata.url || url);

        return {
            captions,
            username,
            thumbnail,
            duration: formatDuration(duration),
            fileSize,
        };
    } catch (error) {
        console.error(`Error fetching video info: ${error.message}`);
        throw new Error('Failed to fetch metadata');
    }
};

// POST request handler
export async function POST(req) {
    let videoUrl; // Declare videoUrl outside of try block for accessibility in finally

    try {
        const { url } = await req.json();
        videoUrl = url; // Assign videoUrl here

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
            duration,
            fileSize
        }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        // Ensure we always remove the URL from activeDownloads even if there's an error
        if (videoUrl) {
            activeDownloads.delete(videoUrl);
        }
    }
}
