# 📄 Document Analyzer

A modern, interactive document analysis platform built with React, Three.js, and advanced web technologies. This application provides intelligent document processing, visualization, and analysis capabilities with a stunning 3D user interface.

## ✨ Features

### 📤 Document Upload & Processing
- Drag-and-drop file upload interface
- Support for multiple document formats
- Real-time document processing
- Batch file handling

### 🎨 Advanced UI Components
- **Glassmorphic Design**: Modern frosted glass effect cards
- **Neumorphic Buttons**: Soft, embossed button designs
- **3D Background**: Immersive Three.js powered background
- **Smooth Animations**: Framer Motion transitions and effects

### 📊 Dashboard & Analytics
- Awesome dashboard with real-time metrics
- Document statistics and insights
- Processing history tracking
- Visual data representation

### 🎮 3D Visualization
- Interactive 3D scene rendering
- Real-time 3D effects and animations
- Postprocessing effects (bloom, depth of field, etc.)
- Responsive 3D environment

### 🔄 Document Processing
- Advanced document parsing
- Content extraction and analysis
- Intelligent text processing
- Error handling and validation

### 🎯 User Experience
- Responsive design for all devices
- Intuitive navigation
- Real-time feedback
- Loading states and progress indicators

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool and dev server

### 3D Graphics & Visualization
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **Drei**: Useful helpers for React Three Fiber
- **React Three Postprocessing**: Post-processing effects for Three.js

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### File Handling
- **React Dropzone**: Drag-and-drop file upload

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📋 Requirements

- Node.js 16.x or higher
- npm or yarn package manager
- Modern web browser with WebGL support

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone git@github.com:itzmeahammed/document-analyzer.git
cd document-analyzer
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

## 🎯 Usage

### Development Server
```bash
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## 📁 Project Structure

```
document-analyzer/
├── src/
│   ├── components/
│   │   ├── Dashboard/          # Dashboard components
│   │   ├── Processing/         # Document processing UI
│   │   ├── Background/         # 3D background components
│   │   └── UI/                 # Reusable UI components
│   ├── types/                  # TypeScript type definitions
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts           # Vite environment types
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Project dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # This file
```

## 🎮 Key Components

### Dashboard Components
- **AwesomeDashboard**: Main dashboard with metrics and analytics
- Real-time statistics display
- Document processing overview

### Processing Components
- **ProcessingPanel**: Document upload and processing interface
- File validation and error handling
- Progress tracking

### UI Components
- **GlassmorphicCard**: Modern frosted glass effect cards
- **NeumorphicButton**: Soft, embossed button designs
- Reusable and customizable

### Background Components
- **EnhancedThreeBackground**: 3D background with Three.js
- Interactive 3D scene
- Post-processing effects

## 🎨 Design System

### Glassmorphism
- Frosted glass effect for modern aesthetics
- Transparency and blur effects
- Elegant card designs

### Neumorphism
- Soft, embossed button designs
- Subtle shadows and highlights
- Tactile user experience

### 3D Effects
- Interactive 3D scenes
- Real-time rendering
- Smooth animations

## 📊 Document Processing

The application supports:
- Text extraction from documents
- Content analysis and parsing
- Metadata extraction
- Format conversion
- Batch processing

## 🔧 Configuration

### Vite Configuration
- Modify `vite.config.ts` for build settings
- Configure plugins and optimizations

### TypeScript
- Update `tsconfig.json` for compiler options
- Adjust type checking strictness

### ESLint
- Configure rules in `eslint.config.js`
- Add custom linting rules

### Tailwind CSS
- Customize theme in `tailwind.config.js`
- Extend color schemes and typography

## 🎨 Customization

### Theme Customization
- Modify Tailwind CSS configuration
- Update color schemes
- Adjust typography

### 3D Scene
- Customize Three.js components
- Adjust lighting and materials
- Modify camera settings

### Animations
- Edit Framer Motion configurations
- Adjust animation timings
- Customize easing functions

## 🐛 Troubleshooting

### WebGL Not Supported
- Ensure your browser supports WebGL
- Update graphics drivers
- Try a different browser

### Performance Issues
- Check browser console for errors
- Reduce 3D scene complexity
- Enable hardware acceleration

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check Node.js version compatibility

### File Upload Issues
- Ensure file size is within limits
- Check file format compatibility
- Verify browser permissions

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## 🙏 Acknowledgments

- React team for the amazing library
- Three.js community for 3D graphics
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- All open-source contributors

---

**Happy Analyzing! 📄✨**
