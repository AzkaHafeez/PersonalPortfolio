# AZK. Portfolio

A minimal, editorial-style portfolio website with smooth animations and a unique aesthetic.

## 🚀 Features

- **Custom cursor** with magnetic hover effects
- **Smooth GSAP animations** throughout
- **Orbiting skills** visualization
- **Bento-style project grid** with dynamic loading
- **Individual project pages** (open in new tabs)
- **Email scramble effect** on hover
- **Mobile-responsive** with hamburger menu
- **Fast & lightweight** - no heavy frameworks

## 📁 Structure

```
portfolio/
├── index.html              # Main portfolio page
├── css/
│   └── style.css           # All styles
├── js/
│   ├── main.js             # Main page scripts
│   └── project-page.js     # Project detail page scripts
├── data/
│   └── projects.json       # Project data (easily editable)
└── projects/
    ├── eventhub.html       # EventHub project details
    ├── edunet.html         # Edunet project details
    └── captainmdcat.html   # CaptainMDCAT project details
```

## ✏️ Customization

### Adding New Projects

1. Add your project to `data/projects.json`:
```json
{
    "id": "your-project",
    "name": "Project Name",
    "description": "Short description",
    "tags": ["React", "Node.js"],
    "year": "2025",
    "page": "projects/your-project.html",
    "image": "images/your-project.jpg",
    "featured": true,
    "links": {
        "live": "https://your-site.com",
        "github": "https://github.com/you/project"
    }
}
```

2. Create a new HTML file in `projects/` (copy an existing one as template)

3. That's it! The project will automatically appear on the homepage.

### Changing Personal Info

- **Name/Logo**: Search for "AZK." in HTML files
- **Email**: Update in `index.html` (contact section)
- **Social Links**: Update URLs in `index.html`
- **About Text**: Edit the about section in `index.html`
- **Skills**: Update the orbit skills in `index.html`

### Changing Colors

Edit the CSS variables at the top of `css/style.css`:
```css
:root {
    --color-bg: #F5F2EB;        /* Background */
    --color-bg-dark: #EBE7DD;   /* Darker background */
    --color-text: #1A1A1A;       /* Text color */
    --color-text-muted: #6B6B6B; /* Muted text */
    --color-highlight: #E63946;  /* Accent color */
}
```

## 🌐 Deployment

This is a static site. Deploy anywhere:

- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)
- Any web hosting

Just upload the entire `portfolio` folder.

## 💡 Tips

- Add actual project images for better visual impact
- Keep project descriptions concise but impactful
- Update the stats (projects shipped, years learning) to reflect your actual numbers
- Add more social links as needed

## 📝 License

Do whatever you want with it. It's yours now. 🤙
