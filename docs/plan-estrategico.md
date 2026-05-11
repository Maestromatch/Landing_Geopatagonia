# Plan Estrategico: GeoPatagonia + Saul el Constructor

## Vision

GeoPatagonia debe evolucionar desde una landing de captacion hacia un sistema comercial para vender tierra con certeza tecnica y, cuando corresponda, conectar esa compra con una ruta de construccion junto a Saul el Constructor.

La oferta central es simple:

- Terreno con rol propio y respaldo topografico.
- Material claro para evaluar: master plan, KMZ, fotos, video y factibilidades.
- Camino opcional hacia casa SIP, diseno y presupuesto inicial.

## Etapa Actual

El proyecto queda en etapa **MVP funcional temprano**.

Ya existe:

- Landing limpia en `landing/` con secciones de propuesta, proyectos, pack terreno + casa y formularios.
- Webhook unico hacia n8n: `geopatagonia-lead`.
- Flujo `GeoPatagonia_OIDO_V1.json` para recibir, normalizar y clasificar leads.
- Flujo `GeoPatagonia_PUBLICADOR_V1.json` para publicar contenido en Instagram/TikTok desde Google Drive, pendiente de credenciales.

Pendiente para produccion:

- Conectar notificaciones reales en n8n.
- Reemplazar placeholders del publicador.
- Cargar material real de parcelas.
- Medir conversiones y fuentes de trafico.
- Versionar el proyecto en el repositorio correcto.

## Embudo Comercial

### 1. Captacion

Entradas principales:

- Anuncios Meta/TikTok hacia la landing.
- Formularios de proyecto.
- Botones de "terreno + casa", "solo terreno" y "ya tengo terreno".
- Comentarios o mensajes con palabras clave como `TERRENO`, `MASTER PLAN`, `CASA` o `KMZ`.

### 2. Clasificacion

El flujo OIDO clasifica el lead en:

- `SOLO_TERRENO`: responsable GeoPatagonia.
- `TERRENO_Y_CASA`: responsable GeoPatagonia + Saul, prioridad alta.
- `SERVICIO_TECNICO`: responsable Saul / equipo tecnico.

### 3. Respuesta

Cada lead debe recibir:

- Confirmacion inmediata.
- Material segun interes.
- Contacto humano por WhatsApp.
- Registro en CRM o planilla.

## Prioridades de Ejecucion

### Fase 1: Cerrar MVP

1. Importar `GeoPatagonia_OIDO_V1.json` en n8n.
2. Probar el webhook con los formularios de la landing.
3. Agregar una salida real: Google Sheets, CRM, email o WhatsApp Cloud API.
4. Revisar que cada tipo de lead llegue al responsable correcto.
5. Publicar la landing en dominio o subdominio definitivo.

### Fase 2: Contenido y Confianza

1. Reemplazar imagenes referenciales por material real.
2. Crear ficha por proyecto con precio, ubicacion, documentos y disponibilidad.
3. Agregar mapa/KMZ descargable o solicitable por formulario.
4. Preparar dossier PDF para Fundo Los Tres y Valle Escondido.
5. Crear preguntas frecuentes sobre rol, factibilidad, financiamiento y construccion.

### Fase 3: Automatizacion Comercial

1. Activar `GeoPatagonia_PUBLICADOR_V1.json` con carpetas Drive reales.
2. Crear calendario de contenidos por proyecto.
3. Automatizar captions, pero mantener aprobacion humana al inicio.
4. Registrar fuente de cada lead: landing, anuncio, Instagram, TikTok o referido.
5. Crear alertas para leads de alta prioridad.

### Fase 4: Escalamiento

1. Crear variantes de landing por campaña.
2. Medir conversion por proyecto y por intencion.
3. Probar anuncios separados: inversion, vivir en el sur, terreno + casa y topografia.
4. Integrar CRM con pipeline: nuevo, contactado, visita agendada, reserva, cierre.
5. Usar los datos de cierre para ajustar oferta, precios y mensajes.

## Indicadores Clave

- Tasa de conversion landing a lead.
- Costo por lead por campana.
- Porcentaje de leads premium `TERRENO_Y_CASA`.
- Tiempo de primera respuesta.
- Visitas agendadas.
- Reservas y ventas.

## Proximo Sprint Recomendado

1. Importar OIDO en n8n y probar 3 leads.
2. Conectar Google Sheets como registro minimo.
3. Subir landing a hosting.
4. Cargar fotos reales de los proyectos.
5. Preparar primera campana con presupuesto controlado.
