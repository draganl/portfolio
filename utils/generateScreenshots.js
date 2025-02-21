// utils/generateScreenshots.js

import fs from "fs";
import path from "path";
import { generateScreenshot } from "./screenshotService.js"; // Use import for screenshotService
import matter from "gray-matter"; // To parse front matter
import { fileURLToPath } from "url";
import sharp from "sharp"; // Import sharp for image processing

// Get the directory name from the current module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createScreenshots() {
  // Ensure the screenshots directory exists in public
  const screenshotsDir = path.join(__dirname, "../public/assets/screenshots");
  fs.mkdirSync(screenshotsDir, { recursive: true });

  // Read all markdown files in the projects directory
  const projectsDir = path.join(__dirname, "../content/projects");
  const files = fs.readdirSync(projectsDir);

  for (const file of files) {
    if (path.extname(file) === ".md") {
      const filePath = path.join(projectsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent); // Parse front matter

      const projectLink = data.link; // Extract the link from front matter
      const projectTitle = data.title; // Extract the title for naming screenshots

      // Define sizes for screenshots (only 1200px now)
      const sizes = [
        { width: 1200, height: 675 }, // Desktop size
      ];

      for (const size of sizes) {
        // Determine the filename based on the project title
        let fileName = `${projectTitle.replace(/\s+/g, "-").toLowerCase()}-${
          size.width
        }x${size.height}.png`; // Change back to .png

        // Special case for filenames that need "title" in them
        if (projectTitle.toLowerCase() === "simple test title") {
          fileName = `simple-test-title-${size.width}x${size.height}.png`; // Change back to .png
        } else if (projectTitle.toLowerCase() === "test blog title") {
          fileName = `test-blog-title-${size.width}x${size.height}.png`; // Change back to .png
        }

        const fileScreenshotPath = path.join(screenshotsDir, fileName);

        // Check if the screenshot already exists
        if (fs.existsSync(fileScreenshotPath)) {
          console.log(`Screenshot already exists: ${fileScreenshotPath}`);
          continue; // Skip to the next size or project
        }

        const screenshot = await generateScreenshot(projectLink, size);
        await sharp(screenshot)
          .toFormat("png", { quality: 80 }) // Change back to PNG
          .toFile(fileScreenshotPath);
        console.log(`Screenshot saved: ${fileScreenshotPath}`);

        // Create a smaller version (600px) by resizing the original
        const smallFileName = fileName.replace(/1200x675/, "600x338");
        const smallFileScreenshotPath = path.join(
          screenshotsDir,
          smallFileName
        );
        await sharp(fileScreenshotPath)
          .resize(600) // Resize to 600px width
          .toFormat("png", { quality: 80 }) // Change back to PNG
          .toFile(smallFileScreenshotPath);
        console.log(`Small screenshot saved: ${smallFileScreenshotPath}`);

        // Update the markdown file with the new paths
        updateMarkdownFile(
          filePath,
          smallFileScreenshotPath,
          fileScreenshotPath
        );
      }
    }
  }
}

// Function to update markdown file with relative image paths
function updateMarkdownFile(filePath, thumbnailPath, imagePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Update front matter with relative paths
  const relativeThumbnailPath = `../assets/screenshots/${path.basename(
    thumbnailPath
  )}`;
  const relativeImagePath = `../assets/screenshots/${path.basename(imagePath)}`;

  data.thumbnail = relativeThumbnailPath;
  data.image = relativeImagePath;

  // Convert back to string
  const updatedContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, updatedContent);
  console.log(`Updated markdown file: ${filePath}`);
}

createScreenshots().catch(console.error);
