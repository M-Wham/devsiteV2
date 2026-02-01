# M-Wham DevSite

A lightweight, retro-styled personal development site built with pure HTML, CSS, and JavaScript, hosted on GitHub Pages.

## 🎨 Design

This site features a nostalgic Windows 95/98 aesthetic with:
- **Light Theme**: Mint green color palette
- **Dark Theme**: Classic terminal green (CRT style)
- Persistent theme preference using localStorage
- Fully responsive design for mobile and desktop

## 🚀 Live Site

Visit the live site at: `https://M-Wham.github.io/MwhamDevsite`

*(Update this URL once deployed to GitHub Pages)*

## 🛠️ Technologies

- Pure HTML5 - Semantic markup
- Pure CSS3 - Custom properties (CSS variables) for theming
- Vanilla JavaScript - Theme toggle functionality
- No frameworks or dependencies!

## 📂 Project Structure

```
MwhamDevsite/
├── index.html              # Homepage
├── posts.html              # Blog posts/projects page
├── contact.html            # Contact and links page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet with retro OS theme
│   ├── js/
│   │   └── script.js       # Theme toggle functionality
│   └── images/
│       ├── icon.png
│       └── icon.svg
├── .nojekyll               # Disables Jekyll processing
└── README.md               # This file
```

## 💻 Local Development

To run this site locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/M-Wham/MwhamDevsite.git
   cd MwhamDevsite
   ```

2. Start a local web server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   
   # Or using Node.js
   npx http-server -p 8000
   ```

3. Open your browser to `http://localhost:8000`

## 🌐 Deployment

This site is configured for GitHub Pages:

1. Push to GitHub
2. Go to repository Settings → Pages
3. Set source to main branch
4. Site will be published at `https://<username>.github.io/<repository>`

## ✨ Features

- **Retro OS Theme**: Windows 95/98 inspired design
- **Dark/Light Toggle**: Switch between themes with persistence
- **Terminal Windows**: Content styled as retro command prompts
- **Responsive**: Works on all device sizes
- **Fast**: Static site with no dependencies
- **SEO Ready**: Proper meta tags and semantic HTML

## 📝 License

This project is open source and available for personal and educational use.

---

Built with nostalgia and code by M-Wham
