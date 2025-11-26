# 📧 Configuración de EmailJS para Café Elementos

Esta guía te ayudará a configurar el servicio de envío de correos electrónicos para las confirmaciones de pedidos.

## ¿Qué es EmailJS?

EmailJS es un servicio gratuito que permite enviar correos electrónicos directamente desde JavaScript sin necesidad de un servidor backend. Es perfecto para proyectos frontend como este.

## Paso 1: Crear una cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up Free"**
3. Crea tu cuenta (puedes usar Google, GitHub o email)

## Paso 2: Configurar un Servicio de Email

1. Una vez dentro del dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email:
   - **Gmail** (recomendado para pruebas)
   - Outlook
   - Yahoo
   - O cualquier otro
4. Sigue las instrucciones para conectar tu cuenta de email
5. Anota tu **Service ID** (ejemplo: `service_abc123`)

### Para Gmail:
- Deberás autorizar EmailJS para enviar correos en tu nombre
- Es posible que necesites habilitar "Acceso de apps menos seguras" o crear una contraseña de aplicación

## Paso 3: Crear una Plantilla de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura la plantilla:

### Campos de la plantilla:

**To Email:**
```
{{to_email}}
```

**From Name:**
```
Café Elementos
```

**Subject:**
```
Confirmación de Pedido #{{order_number}} - Café Elementos
```

**Content (Body):**
```
{{email_body}}
```

4. Guarda la plantilla
5. Anota tu **Template ID** (ejemplo: `template_xyz789`)

## Paso 4: Obtener tu Public Key

1. Ve a **"Account"** en el menú
2. Busca la sección **"API Keys"**
3. Copia tu **Public Key** (ejemplo: `user_aBcDeFgHiJkLmNoPq`)

## Paso 5: Configurar el Proyecto

Abre el archivo `js/main.js` y busca estas líneas al inicio:

```javascript
// CONFIGURACIÓN EMAILJS
const EMAILJS_SERVICE_ID = 'service_xxxxxxx';  // Tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Tu Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx';   // Tu Public Key
```

Reemplaza los valores con tus credenciales:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';     // ← Tu Service ID real
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // ← Tu Template ID real
const EMAILJS_PUBLIC_KEY = 'user_aBcDeFgHiJkLmNoPq'; // ← Tu Public Key real
```

## Paso 6: Probar el Envío

1. Abre el sitio web en tu navegador
2. Agrega productos al carrito
3. Ve al checkout y completa el formulario
4. Confirma el pedido
5. Verifica que el correo llegue al email proporcionado

## Límites del Plan Gratuito

EmailJS ofrece un plan gratuito con:
- **200 emails por mes**
- 2 plantillas de email
- 1 servicio de email

Para un proyecto de simulación o pruebas, esto es más que suficiente.

## Solución de Problemas

### El email no llega
- Revisa la carpeta de spam
- Verifica que las credenciales estén correctas
- Asegúrate de que el servicio de email esté conectado correctamente

### Error de autenticación
- Regenera la Public Key
- Reconecta el servicio de email

### Límite alcanzado
- Espera al siguiente mes para más emails gratuitos
- Considera actualizar a un plan de pago

## Modo de Simulación

Si no configuras EmailJS, el sistema funcionará en **modo simulación**:
- Los pedidos se procesarán normalmente
- El ticket de compra se mostrará en la consola del navegador (F12 → Console)
- El usuario verá la confirmación exitosa

Esto es útil para desarrollo y pruebas sin gastar emails.

---

## Ejemplo de Email Generado

```
═══════════════════════════════════════════
     CONFIRMACIÓN DE PEDIDO - CAFÉ ELEMENTOS
═══════════════════════════════════════════

Número de Orden: CE12345678
Fecha: jueves, 20 de noviembre de 2025, 14:30

───────────────────────────────────────────
DATOS DEL CLIENTE
───────────────────────────────────────────
Nombre: Juan Pérez
Email: juan@ejemplo.com
Teléfono: 993 123 4567
Dirección: Calle Principal #123
Ciudad: Villahermosa
Código Postal: 86040

───────────────────────────────────────────
PRODUCTOS ORDENADOS
───────────────────────────────────────────
• Aldama, Chiapas (1/4) x1 - $350.00 MXN
• Tatetela, Veracruz (1/2) x2 - $480.00 MXN

───────────────────────────────────────────
                    TOTAL: $830.00 MXN
───────────────────────────────────────────

¡Gracias por tu compra!
```

---

¿Necesitas ayuda? Contacta a: cafelementos@gmail.com
