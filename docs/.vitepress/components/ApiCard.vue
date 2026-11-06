<script setup lang="ts">
defineProps<{
  title?: string
  items: { key: string; description: string }[]
}>()
</script>

<template>
  <figure class="api-card">
    <figcaption v-if="title" class="api-card-title">{{ title }}</figcaption>
    <dl>
      <div v-for="item in items" :key="item.key" class="api-card-row">
        <dt>{{ item.key }}</dt>
        <!-- Descriptions are authored in the docs and may contain <code>. -->
        <dd v-html="item.description" />
      </div>
    </dl>
  </figure>
</template>

<style scoped>
.api-card {
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: var(--ring);
  overflow: clip;
}

.api-card-title {
  padding: 10px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-2);
}

dl {
  margin: 0;
}

.api-card-row {
  display: grid;
  grid-template-columns: minmax(0, 11rem) minmax(0, 1fr);
  gap: 4px 24px;
  padding: 12px 16px;
}

.api-card-row + .api-card-row {
  border-top: 1px solid var(--vp-c-divider);
}

dt {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}

dd {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  text-wrap: pretty;
}

@media (max-width: 640px) {
  .api-card-row {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
