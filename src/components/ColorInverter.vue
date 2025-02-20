<script setup lang="ts">
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

const rgbaToHex = (rgba: string): string => {
  // Extract numbers from rgba string
  const matches = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/)
  if (!matches) return rgba

  const r = parseInt(matches[1])
  const g = parseInt(matches[2])
  const b = parseInt(matches[3])

  // Convert to hex
  const toHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

const handleColorChange = (value: string) => {
  // Convert RGBA to hex if needed
  const hexColor = value.startsWith('rgb') ? rgbaToHex(value) : value.toUpperCase()
  inputColor.value = hexColor
}

const validateAndUpdateColor = (value: string) => {
  const hexRegex = /^#[0-9A-F]{6}$/i
  if (!value.startsWith('#')) {
    value = '#' + value
  }
  if (hexRegex.test(value)) {
    inputColor.value = value.toUpperCase()
  } else {
    ElMessage.warning('Please enter a valid hex color (e.g., #1E90FF)')
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputColor.value)
    ElMessage.success({
      message: 'Color code copied to clipboard!',
      duration: 2000
    })
  } catch (err) {
    ElMessage.error('Failed to copy color code')
  }
}
</script>

<template>
  <div class="color-inverter">
    <h1>Dark Mode Color Inverter</h1>
    
    <div class="color-display">
      <div class="color-box">
        <div class="color-preview" :style="{ backgroundColor: inputColor }">
          <el-color-picker
            v-model="inputColor"
            size="large"
            :show-alpha="false"
            @change="handleColorChange"
            class="color-picker-overlay"
          />
        </div>
        <div class="color-info">
          <span class="color-label">Input Color</span>
          <el-input
            v-model="inputColor"
            class="hex-input"
            @change="validateAndUpdateColor"
          />
        </div>
      </div>

      <div class="transform-arrow">
        <el-icon><ArrowRight /></el-icon>
      </div>

      <div class="color-box">
        <div class="color-preview" :style="{ backgroundColor: outputColor }">
          <el-button
            class="copy-button"
            @click="copyToClipboard"
          >
            <el-icon><CopyDocument /></el-icon>
            Copy
          </el-button>
        </div>
        <div class="color-info">
          <span class="color-label">Output Color</span>
          <el-input
            :model-value="outputColor"
            readonly
            class="hex-input"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.color-inverter {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin: 0 0 2rem;
  font-weight: 700;
}

.color-display {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .color-display {
    flex-direction: column;
    gap: 1.5rem;
  }

  .transform-arrow {
    transform: rotate(90deg);
  }
}

.color-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.color-preview {
  height: 200px;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-preview:hover {
  transform: translateY(-2px);
}

.color-picker-overlay {
  opacity: 0;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.color-picker-overlay:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

.copy-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
}

.color-preview:hover .copy-button {
  opacity: 1;
}

.copy-button:hover {
  background: white;
  transform: scale(1.05);
}

.color-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.hex-input :deep(.el-input__wrapper) {
  box-shadow: none;
  background: #f5f7fa;
  border-radius: 8px;
  padding: 0.5rem;
}

.hex-input :deep(.el-input__wrapper:hover) {
  background: #e9ecef;
}

.transform-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 2rem;
}

.preset-section {
  border-top: 1px solid #eee;
  padding-top: 2rem;
  margin-top: 1rem;
}

.preset-section h3 {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
  font-weight: 500;
}

.preset-colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 1rem;
  justify-items: center;
}

.preset-color {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preset-color:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

:deep(.el-color-picker__trigger) {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
}

:deep(.el-color-picker__color) {
  border: none;
}
</style>