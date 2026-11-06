---
title: Límites de solicitudes
description: Límites de solicitudes y buenas prácticas para integraciones.
---

# Límites de solicitudes

Los límites se aplican por workspace y por `X-Client-Name`:

<ApiCard
  title="límites"
  :items="[
    { key: 'Sustained', description: '60 solicitudes por minuto' },
    { key: 'Burst', description: 'hasta 20 solicitudes en un segundo' },
    { key: 'Over the limit', description: '<code>429 Too Many Requests</code> con un encabezado <code>Retry-After</code>' }
  ]"
/>

## Buenas prácticas

- **Reintenta con retroceso exponencial.** Ante un `429`, espera los segundos indicados en `Retry-After`. Ante un `5xx`, reintenta las solicitudes idempotentes (GET, PUT, DELETE) con retroceso exponencial y jitter.
- **Agrupa las escrituras.** `POST .../scheduled-visits` acepta una ruta completa en una sola llamada: una solicitud para 50 visitas, no 50 solicitudes.
- **Pagina con el tamaño máximo** (`size=200`) al leer colecciones completas.
- **Guarda en caché lo que cambia poco**, como cadenas, marcas y campos de encuesta.
- **Sincroniza de forma incremental** con `since` en lugar de volver a leer todo.

## Métodos HTTP

<script setup>
const methodsTable = [
  { key: 'GET', description: 'Leer' },
  { key: 'POST', description: 'Crear' },
  { key: 'PUT', description: 'Reemplazar (v1)' },
  { key: 'PATCH', description: 'Actualizar solo los campos que envías (v3)' },
  { key: 'DELETE', description: 'Eliminar. Nunca lleva cuerpo; los ID van en la ruta o en la cadena de consulta.' }
]
</script>

<ApiCard title="Métodos HTTP" :items="methodsTable" />
