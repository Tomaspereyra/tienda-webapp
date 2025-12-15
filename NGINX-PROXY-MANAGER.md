# Nginx Proxy Manager - Guía de Configuración SSL

## Acceso Inicial

**URL Admin:** http://localhost:81

**Credenciales por defecto:**
- Email: `admin@example.com`
- Password: `changeme`

⚠️ **IMPORTANTE:** Cambiar estas credenciales en el primer login!

---

## Configuración Paso a Paso

### 1. Primer Login

1. Ir a http://localhost:81
2. Login con credenciales por defecto
3. Te va a pedir cambiar email y password
4. Confirmar cambios

### 2. Agregar Certificado SSL (Let's Encrypt)

#### Opción A: Con Dominio (Producción)

1. **Ir a "SSL Certificates"** en el menú
2. **Click "Add SSL Certificate"**
3. **Select "Let's Encrypt"**
4. **Completar:**
   ```
   Domain Names: tudominio.com, www.tudominio.com
   Email: tu-email@example.com
   ✅ Use a DNS Challenge (si tu proveedor lo soporta)
   OR
   ✅ Use HTTP-01 Challenge (más simple)
   ✅ I Agree to the Let's Encrypt Terms of Service
   ```
5. **Save** - El certificado se genera automáticamente

#### Opción B: Certificado Self-Signed (Testing Local)

Para testing en localhost sin dominio:
1. **SSL Certificates → Add SSL Certificate**
2. **Select "Custom"**
3. Generar self-signed:
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout selfsigned.key -out selfsigned.crt \
     -subj "/CN=localhost"
   ```
4. Copiar contenido de `.crt` y `.key` en NPM

### 3. Configurar Proxy Hosts

#### Proxy Host para Frontend

1. **Ir a "Hosts → Proxy Hosts"**
2. **Click "Add Proxy Host"**
3. **Tab "Details":**
   ```
   Domain Names: tudominio.com (o localhost para testing)
   Scheme: http
   Forward Hostname/IP: frontend
   Forward Port: 80
   ☐ Cache Assets
   ☑ Block Common Exploits
   ☑ Websockets Support
   ```
4. **Tab "SSL":**
   ```
   SSL Certificate: [Select tu certificado Let's Encrypt]
   ☑ Force SSL
   ☑ HTTP/2 Support
   ☑ HSTS Enabled
   ☐ HSTS Subdomains (opcional)
   ```
5. **Save**

#### Proxy Host para Backend API

1. **Add Proxy Host**
2. **Tab "Details":**
   ```
   Domain Names: api.tudominio.com (o localhost/api)
   Scheme: http
   Forward Hostname/IP: backend
   Forward Port: 3000
   ☑ Block Common Exploits
   ☑ Websockets Support
   ```
3. **Tab "Custom locations" (si usas /api path):**
   ```
   Define location: /api
   Scheme: http
   Forward Hostname/IP: backend
   Forward Port: 3000
   ```
4. **Tab "SSL":**
   ```
   SSL Certificate: [Select tu certificado]
   ☑ Force SSL
   ☑ HTTP/2 Support
   ```
5. **Save**

### 4. Actualizar Variables de Entorno

Una vez configurado NPM, necesitás actualizar:

#### Frontend
```bash
# frontend/.env.production
VITE_API_BASE_URL=https://tudominio.com/api
# o si usas subdominio:
VITE_API_BASE_URL=https://api.tudominio.com
```

#### Backend (CORS)
```yaml
# docker-compose.yml
environment:
  - CORS_ORIGIN=https://tudominio.com
```

**Rebuild después de cambiar:**
```bash
docker-compose down
docker-compose up -d --build
```

---

## Arquitectura Final

### Con Dominio Único + Path
```
Browser
   ↓ HTTPS
Nginx Proxy Manager
   ├→ https://tudominio.com/     → Frontend (React)
   └→ https://tudominio.com/api  → Backend (Go API)
```

### Con Subdominios
```
Browser
   ↓ HTTPS
Nginx Proxy Manager
   ├→ https://tudominio.com      → Frontend
   └→ https://api.tudominio.com  → Backend
```

---

## Renovación Automática

Let's Encrypt certificates **se renuevan automáticamente** 30 días antes de expirar.

Verificar:
- **SSL Certificates** → Ver "Expires In"
- Nginx Proxy Manager maneja la renovación solo
- No hay que hacer nada manual

---

## Testing Local (Sin Dominio)

Si querés testear SSL en localhost:

1. **Usar self-signed certificate** (ver Opción B arriba)
2. **Configurar hosts:**
   - Domain: `localhost`
   - Forward to: `frontend:80` o `backend:3000`
3. **Tu navegador va a mostrar warning** (normal con self-signed)
4. Hacer click en "Advanced" → "Proceed to localhost"

---

## Troubleshooting

### Certificado no se genera
- ✅ Verificar que puerto 80 está libre (no usado por otros servicios)
- ✅ DNS apuntando correctamente a tu servidor
- ✅ Firewall permite puerto 80 y 443
- ✅ Usar HTTP-01 Challenge (más compatible)

### Error 502 Bad Gateway
- Verificar que contenedores están corriendo: `docker-compose ps`
- Verificar health checks: Backend y Frontend deben estar "healthy"
- Revisar logs: `docker-compose logs proxy`

### CORS Errors
- Actualizar `CORS_ORIGIN` en backend
- Debe coincidir EXACTAMENTE con el dominio del frontend
- Incluir protocolo: `https://tudominio.com` no `tudominio.com`

---

## Comandos Útiles

```bash
# Ver logs de Nginx Proxy Manager
docker-compose logs proxy

# Acceso a config de NPM
docker exec -it tienda-proxy sh

# Reiniciar solo el proxy
docker-compose restart proxy

# Renovar certificados manualmente (normalmente no necesario)
docker exec tienda-proxy /app/certbot-renew.sh
```

---

## Configuración Recomendada para Producción

### Security Headers (en NPM → Advanced)

```nginx
# En Proxy Host → Advanced → Custom Nginx Configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

# Para API - CORS custom si necesario
location /api {
    proxy_pass http://backend:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Rate Limiting

```nginx
# Limitar requests por IP
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req zone=api_limit burst=20 nodelay;
```

---

## Checklist Pre-Producción

- [ ] Cambiar credenciales admin de NPM
- [ ] Certificado SSL configurado y válido
- [ ] Frontend proxy host configurado
- [ ] Backend proxy host configurado
- [ ] CORS actualizado en backend
- [ ] API URL actualizada en frontend
- [ ] Force SSL habilitado
- [ ] HTTP/2 habilitado
- [ ] HSTS habilitado
- [ ] Security headers configurados
- [ ] Rate limiting configurado (opcional)
- [ ] Testeado acceso via HTTPS
- [ ] Testeado admin panel
- [ ] Verificar auto-renewal de certificados

---

## Acceso Final

Una vez todo configurado:

- **Frontend:** https://tudominio.com
- **API:** https://tudominio.com/api (o https://api.tudominio.com)
- **Admin Panel:** https://tudominio.com/admin/login
- **NPM Dashboard:** http://tu-servidor-ip:81 (cerrar después de configurar)

🎉 Listo para producción con SSL/HTTPS automático!
