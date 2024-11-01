import { exec } from 'child_process';
import { resolve } from 'path';
import fs from 'fs';


const activeDownloads = new Set();

export async function POST(req) {
    let url;
    try {
        const { url: reqUrl, option } = await req.json();
        url = reqUrl;

        if (!url || !option) {
            return new Response(JSON.stringify({ error: 'Invalid request. URL and option are required.' }), { status: 400 });
        }

        if (activeDownloads.has(url)) {
            return new Response(JSON.stringify({ error: 'This video is already being processed by another request' }), { status: 409 });
        }

        activeDownloads.add(url);

        const outputFilePath = resolve('./downloads', option === 'video' ? `video_${Date.now()}.mp4` : `audio_${Date.now()}.mp3`);

        const command = option === 'video'
            ? `yt-dlp -o "${outputFilePath}" -S "vcodec:avc1" "${url}"`
            : `yt-dlp -x --audio-format mp3 -o "${outputFilePath}" "${url}"`;

        return new Promise((resolve, reject) => {
            exec(command, async (error) => {
                activeDownloads.delete(url);
                if (error) {
                    console.error(`Error downloading: ${error.message}`);
                    return reject(new Response(JSON.stringify({ error: 'Download failed' }), { status: 500 }));
                }

                if (fs.existsSync(outputFilePath)) {
                    const fileStream = fs.createReadStream(outputFilePath);

                    const contentType = option === 'video' ? 'video/mp4' : 'audio/mpeg';
                    const responseHeaders = new Headers({
                        'Content-Type': contentType,
                        'Content-Disposition': `attachment; filename="${option === 'video' ? 'video.mp4' : 'audio.mp3'}"`
                    });

                    const response = new Response(fileStream, { status: 200, headers: responseHeaders });

                    if (option === 'audio') {
                        response.headers.set('X-Message', 'This is a slideshow or photo video, and only music is available to download.');
                    }

                    fileStream.on('end', async () => {
                        try {
                            await fs.promises.unlink(outputFilePath); // Use fs.promises.unlink for async deletion
                            console.log(`Deleted file: ${outputFilePath}`);
                        } catch (unlinkErr) {
                            console.error('Error deleting file after download:', unlinkErr);
                        }
                    });

                    resolve(response);
                } else {
                    reject(new Response(JSON.stringify({ error: 'Media file not found' }), { status: 404 }));
                }
            });
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        if (url) {
            activeDownloads.delete(url);
        }
    }
}
