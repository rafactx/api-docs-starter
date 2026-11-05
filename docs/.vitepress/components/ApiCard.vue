<template>
  <div class="api-macos-window">
    <div class="api-macos-header">
      <div class="macos-buttons">
        <div class="macos-btn macos-btn-red"></div>
        <div class="macos-btn macos-btn-yellow"></div>
        <div class="macos-btn macos-btn-green"></div>
      </div>
      <span class="api-macos-title">{{ title }}</span>
    </div>
    <div class="api-macos-content">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="api-macos-row"
      >
        <span class="api-macos-key" :class="item.color">{{ item.key }}</span>
        <span class="api-macos-value">
          <span v-html="item.description"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'request.headers'
  },
  items: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.api-macos-window {
  /* Glassmorphism: clean, soft, shadow only, no border! */
  background: var(--api-macos-bg, rgba(255,255,255,0.7));
  border-radius: 14px;
  box-shadow: 0 6px 32px 0 rgba(28,28,28,0.16), 0 1.5px 3px 0 rgba(28,28,30,0.05);
  overflow: hidden;
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  margin: 1.5rem 0;
  animation: fadeUp 0.5s cubic-bezier(.42,0,.58,1);
  transition: box-shadow 0.2s cubic-bezier(.42,0,.58,1);
}

.api-macos-window:hover {
  box-shadow: 0 12px 36px 0 rgba(28,28,28,0.24), 0 2px 8px 0 rgba(28,28,30,0.09);
}

.api-macos-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px 14px 18px;
  background: linear-gradient(
    120deg,
    rgba(240,241,246,0.60) 0%,
    rgba(255,255,255,0.35) 100%
  );
  position: relative;
  z-index: 1;
  /* visual feedback: soft bottom border only, but ultra subtle */
  box-shadow: 0 1px 0 0 rgba(28,28,30,0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.macos-buttons {
  display: flex;
  gap: 8px;
  margin-right: 8px;
}

.macos-btn {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  box-shadow: 0 0.5px 1.5px rgba(0,0,0,0.07);
  border: 0.5px solid rgba(0,0,0,0.04);
  transition: transform 0.13s cubic-bezier(.42,0,.58,1);
  position: relative;
  cursor: default;
}
.macos-btn:hover {
  transform: scale(1.11);
}
.macos-btn-red    { background: linear-gradient(120deg,#fd594b 60%,#ea3323 100%);}
.macos-btn-yellow { background: linear-gradient(120deg,#fdbd41 60%,#f8e36b 100%);}
.macos-btn-green  { background: linear-gradient(120deg,#31c150 60%,#28b846 100%);}

.api-macos-title {
  font-size: 14px;
  color: var(--vp-c-text-1, #222);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-left: 8px;
  opacity: 0.75;
  text-shadow: 0 1px 1.5px rgba(255,255,255,0.18);
  user-select: text;
  transition: color 0.15s;
}

/* Content rows */
.api-macos-content {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 14px;
  background: transparent;
}

.api-macos-row {
  display: flex;
  gap: 18px;
  padding: 14px 22px 14px 22px;
  align-items: flex-start;
  border-bottom: 1px solid rgba(40,40,50,0.05);
  transition: background 0.2s, transform 0.18s cubic-bezier(.42,0,.58,1);
  position: relative;
  min-height: 36px;
}

.api-macos-row:last-child {
  border-bottom: none;
}

.api-macos-row:hover {
  background: rgba(120,140,255,0.04);
  transform: translateY(-1.5px) scale(1.01);
}

.api-macos-key {
  font-weight: 600;
  min-width: 135px;
  flex-shrink: 0;
  font-size: 13px;
  letter-spacing: -0.01em;
  user-select: text;
  font-family: inherit;
}
.api-macos-key.blue    { color: #006fff; }
.api-macos-key.purple  { color: #7158e2; }
.api-macos-key.pink    { color: #ff2d92; }
.api-macos-key.red     { color: #ff3b30; }
.api-macos-key.green   { color: #28b846; }

.api-macos-value {
  color: var(--vp-c-text-2, #444);
  line-height: 1.6;
  font-size: 13px;
  user-select: text;
  font-family: inherit;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* DARK MODE */
:root.dark .api-macos-window {
  --api-macos-bg: rgba(32,34,38,0.72);
  background: var(--api-macos-bg);
  box-shadow: 0 8px 34px 0 rgba(20,20,22,0.28), 0 2px 8px 0 rgba(20,20,24,0.18);
}
:root.dark .api-macos-header {
  background: linear-gradient(120deg,rgba(38,41,49,0.82) 0%,rgba(26,27,32,0.56) 100%);
  box-shadow: 0 1px 0 0 rgba(190,190,200,0.035);
}
:root.dark .api-macos-title {
  color: #eee;
  text-shadow: 0 1px 2px rgba(0,0,0,0.22);
}
:root.dark .api-macos-content {
  background: transparent;
}
:root.dark .api-macos-row {
  border-bottom: 1px solid rgba(220,220,230,0.04);
}
:root.dark .api-macos-row:hover {
  background: rgba(60,80,140,0.06);
}
:root.dark .api-macos-key.blue    { color: #0a84ff; }
:root.dark .api-macos-key.purple  { color: #5e5ce6; }
:root.dark .api-macos-key.pink    { color: #ff375f; }
:root.dark .api-macos-key.red     { color: #ff453a; }
:root.dark .api-macos-key.green   { color: #28cd41; }

/* Responsive */
@media (max-width: 768px) {
  .api-macos-window { margin: 1rem 0; border-radius: 9px; }
  .api-macos-header { padding: 13px 12px 10px 13px; }
  .api-macos-row { padding: 12px 13px; flex-direction: column; gap: 5px; }
  .api-macos-key { min-width: auto; }
}
</style>
