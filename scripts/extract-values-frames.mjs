import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

const rootDir = process.cwd();
const sourceVideo = path.join(rootDir, "public", "video", "3dvideo.mp4");
const outputRoot = path.join(rootDir, "public", "values-sequence");
const desktopDir = path.join(outputRoot, "desktop");
const mobileDir = path.join(outputRoot, "mobile");
const manifestPath = path.join(outputRoot, "manifest.json");

const ffmpegPath = process.env.FFMPEG_PATH || ffmpegInstaller.path || "ffmpeg";
const ffprobePath = process.env.FFPROBE_PATH || ffprobeInstaller.path || "ffprobe";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(new Error(`${command} exited with code ${code}\n${stderr}`));
    });
  });
}

async function emptyDirectory(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function probeVideo() {
  const { stdout } = await run(ffprobePath, [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height,r_frame_rate,duration,nb_frames",
    "-of",
    "json",
    sourceVideo,
  ]);
  const data = JSON.parse(stdout);
  const stream = data.streams?.[0];

  if (!stream) {
    throw new Error(`No video stream found in ${sourceVideo}`);
  }

  const duration = Number.parseFloat(stream.duration);
  const [rateNumerator, rateDenominator] = String(stream.r_frame_rate || "30/1")
    .split("/")
    .map((value) => Number.parseFloat(value));
  const fps = rateNumerator && rateDenominator ? rateNumerator / rateDenominator : 30;

  return {
    width: Number(stream.width),
    height: Number(stream.height),
    duration,
    fps,
    sourceFrames: Number(stream.nb_frames) || null,
  };
}

async function extractSequence({ outDir, width, quality, fps }) {
  const outputPattern = path.join(outDir, "frame_%04d.webp");

  await run(ffmpegPath, [
    "-hide_banner",
    "-y",
    "-i",
    sourceVideo,
    "-vf",
    `fps=${fps},scale='min(${width},iw)':-2`,
    "-loop",
    "0",
    "-compression_level",
    "4",
    "-q:v",
    String(quality),
    "-an",
    outputPattern,
  ]);

  const files = (await fs.readdir(outDir)).filter((file) => /^frame_\d{4}\.webp$/.test(file)).sort();
  return files.length;
}

async function main() {
  await fs.access(sourceVideo);
  const source = await probeVideo();
  const targetFrames = 150;
  const sequenceFps = Math.min(30, Math.max(12, targetFrames / source.duration));

  await emptyDirectory(desktopDir);
  await emptyDirectory(mobileDir);

  const desktopFrameCount = await extractSequence({
    outDir: desktopDir,
    width: 1200,
    quality: 82,
    fps: sequenceFps,
  });
  const mobileFrameCount = await extractSequence({
    outDir: mobileDir,
    width: 760,
    quality: 78,
    fps: sequenceFps,
  });

  const manifest = {
    source: {
      path: "/video/3dvideo.mp4",
      width: source.width,
      height: source.height,
      duration: source.duration,
      fps: source.fps,
      frames: source.sourceFrames,
    },
    generatedAt: new Date().toISOString(),
    sequenceFps,
    desktop: {
      path: "/values-sequence/desktop/",
      pattern: "frame_%04d.webp",
      frameCount: desktopFrameCount,
      width: 1200,
      quality: 82,
    },
    mobile: {
      path: "/values-sequence/mobile/",
      pattern: "frame_%04d.webp",
      frameCount: mobileFrameCount,
      width: 760,
      quality: 78,
    },
  };

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`Generated ${desktopFrameCount} desktop frames`);
  console.log(`Generated ${mobileFrameCount} mobile frames`);
  console.log(`Wrote ${path.relative(rootDir, manifestPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
