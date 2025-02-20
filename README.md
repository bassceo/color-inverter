# Dark Mode Color Inverter
# [Actual Deploy Link](https://color-inverter.netlify.app/)

## Table of Contents
- [Getting Started](#getting-started)
- [Project Scripts](#project-scripts)
- [Project Structure](#project-structure)
- [Usage Example](#usage-example)
- [License](#license)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/vite-vue-typescript-starter.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd vite-vue-typescript-starter
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

---

## Project Scripts

In the project directory, you can run the following scripts:

- **Development Server**  
  Starts the development server with hot reload on [localhost:5173](http://localhost:5173) (by default).
  ```bash
  npm run dev
  ```
  
- **Build**  
  Type checks the project and bundles it for production to the `dist` folder.
  ```bash
  npm run build
  ```
  
- **Preview**  
  Serves the production build locally for final testing.
  ```bash
  npm run preview
  ```

---

## Project Structure

Below is a simplified view of the key files and directories:

```
vite-vue-typescript-starter
├─ public/
├─ src/
│  ├─ components/
│  ├─ utils/
│  │  └─ colorTransform.ts       // Contains the `invertHueRotate` function
│  ├─ App.vue
│  └─ main.ts
├─ tsconfig.json                  // TypeScript configuration
├─ vite.config.ts                 // Vite configuration
├─ package.json
└─ README.md                      // This file
```

- **`src/components/ColorInverter.vue`** (demonstrative name): 
  - Showcases a color inversion utility using a color picker from Element Plus.
  - Demonstrates TypeScript usage within the `<script setup lang="ts">`.
  - Includes error handling and color validation logic.

---

## Usage Example

1. **Run the development server**:
   ```bash
   npm run dev
   ```
2. **Open your browser** and navigate to the provided local URL (e.g., [http://localhost:5173](http://localhost:5173)).
3. **Color Inverter Demo**:
   - Enter or pick a color using the integrated Element Plus color picker.
   - The inverted color for dark mode usage will be displayed on the right.
   - Copy the inverted color to the clipboard with a single click.

Here’s a snippet of the core logic in the color-inverter component:

```ts
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { invertHueRotate } from '../utils/colorTransform'

const inputColor = ref('#1E90FF')
const outputColor = computed(() => {
  try {
    return invertHueRotate(inputColor.value)
  } catch (error) {
    ElMessage.error((error as Error).message)
    return '#000000'
  }
})
```

This showcases how you can write and manage reactive state with Vue 3 and TypeScript.

---

## License

This project is open-sourced under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as you wish.

---

**Happy Coding!**
```