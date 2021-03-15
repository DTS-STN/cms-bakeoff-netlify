import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import yaml from "js-yaml";

const postsDirectory = path.resolve(process.cwd(), "posts");

// Returns a list of files in the directories and
// subdirectories in the formal ['en/filename.md']
function getAllPostFileNames(directoryPath, filesList = []) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllPostFileNames(`${directoryPath}/${file}`, filesList);
    } else {
      filesList.push(path.join(path.basename(directoryPath), "/", file));
    }
  });

  // Filter to include only * .md files
  // If you don't use this, even .DS_Stores are included
  const filteredList = filesList.filter((file) => file.includes(".md"));
  return filteredList;
}

// Collects information from files and sorts them by date
export function getSortedPostData() {
  // Get the list of * .md files in the posts directory
  const fileNames = getAllPostFileNames(postsDirectory)

  // Uses gray-matter to collect information from the file
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.split("/")[1].replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    const frontMatter = matter(fileContents, {
      engines: {
        yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
      },
    });

  return {
      id,
      title: frontMatter.data.title,
      date: frontMatter.data.date,
      lang: frontMatter.data.lang,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Separates the file name and language
export function getAllPostIds() {
  // Get the list of * .md files in the posts directory
  const fileNames = getAllPostFileNames(postsDirectory);

  // Splits the "en" and "filename" parts of ['en/filename.md']
  // and return them as parameters for later use in Next
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.split("/")[1].replace(/\.md$/, ""),
      lang: fileName.split("/")[0],
    },
  }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
  };
}
