/**
 * Blog System - Dynamic Markdown Post Loader
 * Loads and renders blog posts from the blog_posts/ directory
 */

// Configuration
const BLOG_CONFIG = {
    indexFile: 'blog_posts/.index.json',
    blogPostsDir: 'blog_posts/',
    markedJsCDN: 'https://cdn.jsdelivr.net/npm/marked@11/marked.min.js'
};

// State
let postsData = null;
let markedLoaded = false;

/**
 * Initialize the blog system
 */
async function initBlog() {
    // Only run on posts page
    const postsList = document.getElementById('posts-list');
    if (!postsList) return;

    try {
        // Load marked.js for markdown parsing
        await loadMarkedJS();

        // Check if we're viewing a specific post
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('post');

        if (postId) {
            await renderSinglePost(postId);
        } else {
            await renderPostsList();
        }
    } catch (error) {
        console.error('Error initializing blog:', error);
        showError('Failed to load blog posts. Please try again later.');
    }
}

/**
 * Load marked.js library from CDN
 */
function loadMarkedJS() {
    return new Promise((resolve, reject) => {
        if (window.marked) {
            markedLoaded = true;
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = BLOG_CONFIG.markedJsCDN;
        script.onload = () => {
            markedLoaded = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Load the post index
 */
async function loadPostIndex() {
    if (postsData) return postsData;

    const response = await fetch(BLOG_CONFIG.indexFile);
    if (!response.ok) {
        throw new Error(`Failed to load post index: ${response.statusText}`);
    }

    postsData = await response.json();
    return postsData;
}

/**
 * Fetch markdown content from a file
 */
async function fetchMarkdown(filePath) {
    const response = await fetch(BLOG_CONFIG.blogPostsDir + filePath);
    if (!response.ok) {
        throw new Error(`Failed to load post: ${response.statusText}`);
    }
    return await response.text();
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { metadata: {}, content: content };
    }

    const [, frontmatterStr, markdownContent] = match;
    const metadata = {};

    // Parse YAML-style frontmatter
    frontmatterStr.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            metadata[key] = value;
        }
    });

    return { metadata, content: markdownContent };
}

/**
 * Render the list of all posts
 */
async function renderPostsList() {
    const postsList = document.getElementById('posts-list');
    const data = await loadPostIndex();

    if (!data.posts || data.posts.length === 0) {
        postsList.innerHTML = '<p style="padding: 16px; color: var(--win-text);">No posts available yet.</p>';
        return;
    }

    // Sort posts by date (newest first)
    const sortedPosts = [...data.posts].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // Generate post tiles
    postsList.innerHTML = sortedPosts.map(post => `
        <a href="posts.html?post=${post.id}" class="post-tile">
            <div class="post-tile-header">
                <span class="post-tile-title">${escapeHTML(post.title)}</span>
                <span class="post-tile-date">${escapeHTML(post.date)}</span>
            </div>
        </a>
    `).join('');
}

/**
 * Render a single post
 */
async function renderSinglePost(postId) {
    const postsList = document.getElementById('posts-list');
    const data = await loadPostIndex();

    // Find the post
    const post = data.posts.find(p => p.id === postId);
    if (!post) {
        showError(`Post "${postId}" not found.`);
        return;
    }

    // Fetch and parse markdown
    const markdownText = await fetchMarkdown(post.file);
    const { metadata, content } = parseFrontmatter(markdownText);

    // Convert markdown to HTML
    const htmlContent = marked.parse(content);

    // Fix image paths for folder-based posts
    let processedHTML = htmlContent;
    if (post.type === 'folder') {
        const folderPath = post.file.substring(0, post.file.lastIndexOf('/'));
        processedHTML = htmlContent.replace(
            /src="\.\/([^"]+)"/g,
            `src="${BLOG_CONFIG.blogPostsDir}${folderPath}/$1"`
        );
    }

    // Render post
    postsList.parentElement.innerHTML = `
        <div class="markdown-section">
            <div class="post-header">
                <h1 class="post-title">${escapeHTML(metadata.title || post.title)}</h1>
                <span class="post-date">${escapeHTML(metadata.date || post.date)}</span>
            </div>
            <div class="markdown-content">
                ${processedHTML}
            </div>
        </div>
        <div class="markdown-section">
            <div class="markdown-content">
                <p><a href="posts.html">← Back to all posts</a></p>
            </div>
        </div>
    `;
}

/**
 * Show error message
 */
function showError(message) {
    const postsList = document.getElementById('posts-list');
    if (postsList) {
        postsList.innerHTML = `
            <div class="markdown-section">
                <div class="markdown-content">
                    <h2>Error</h2>
                    <p>${escapeHTML(message)}</p>
                    <p><a href="posts.html">← Back to posts</a></p>
                </div>
            </div>
        `;
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
} else {
    initBlog();
}
