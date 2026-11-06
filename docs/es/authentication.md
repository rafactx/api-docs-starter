---
title: Autenticación
description: Credenciales y encabezados obligatorios de la Shelfline Field API.
---

# Autenticación

La API usa **autenticación HTTP Basic** sobre HTTPS. Crea un *usuario de integración* en el panel de administración de Shelfline para cada sistema que llame a la API, en lugar de compartir el acceso de una persona.

## Encabezados obligatorios

<ApiCard
  title="request.headers"
  :items="[
    { key: 'Authorization', description: '<code>Basic base64(username:password)</code>. Obligatorio en cada solicitud.' },
    { key: 'X-Client-Name', description: 'Nombre de tu integración, por ejemplo <code>erp-sync</code>. Aparece en los registros de auditoría y se usa para el límite de solicitudes. Obligatorio.' },
    { key: 'Api-Version', description: 'Fecha de lanzamiento del contrato v3 con el que desarrollaste tu integración, por ejemplo <code>2025-01-15</code>. Solo v3.' }
  ]"
/>

## Cómo construir el encabezado Authorization

```bash
echo -n "erp-integration:correct-horse-battery" | base64
# ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==

Authorization: Basic ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==
```

La mayoría de los clientes HTTP lo hacen por ti: `curl -u user:password`, `requests.get(..., auth=(user, password))`.

::: warning Mantén las credenciales fuera del código
Lee las credenciales desde variables de entorno o un gestor de secretos. Si se filtra una contraseña, rótala en el panel de administración: solo se ve afectado ese usuario de integración.
:::

## Versionado con Api-Version

Los endpoints v3 se versionan por fecha. Tú envías la versión para la que se escribió tu integración, y la forma de la respuesta se mantiene igual incluso después de nuevos lanzamientos.

```http
Api-Version: 2025-01-15
```

- Cuando un lanzamiento introduce un cambio incompatible, recibe una fecha nueva. Tu integración sigue recibiendo la forma anterior hasta que cambies el encabezado.
- Si omites el encabezado, recibes la versión más reciente. Está bien para explorar, pero es arriesgado en producción.
- Los endpoints v1 ignoran el encabezado.

## Cómo encontrar tu ID de workspace

El ID del workspace aparece en la URL del panel de administración: `https://demo.shelfline.example/admin/workspaces/7` → `workspaceId = 7`.
