
# Proyecto: Panadería Digital (E-commerce)

Este es un proyecto de plataforma de comercio electrónico diseñada para una panadería artesanal. Su objetivo principal es permitir a los usuarios explorar productos de panadería y pastelería, agregarlos a un carrito de compras y completar pedidos en línea.

---

## Índice

* [Características](#características)
* [Tecnologías Utilizadas](#tecnologías-utilizadas)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Instalación](#instalación)
* [Ejecución](#ejecución)
* [Próximas Funcionalidades](#próximas-funcionalidades)
* [Contribuciones](#contribuciones)
* [Licencia](#licencia)

---

## Características

* Catálogo interactivo de productos con imágenes, descripciones y precios.
* Carrito de compras funcional con capacidad para agregar, eliminar o modificar productos.
* Proceso de checkout con formulario de información de envío y confirmación de pedido.
* Interfaz responsiva adaptada a dispositivos móviles y escritorio.
* Navegación fluida entre páginas utilizando React Router.

---

## Tecnologías Utilizadas

| Tecnología       | Descripción                                          |
| ---------------- | ---------------------------------------------------- |
| **React**        | Librería para construir interfaces de usuario.       |
| **TypeScript**   | Superset de JavaScript con tipado estático.          |
| **Tailwind CSS** | Framework de estilos utilitarios para UI moderna.    |
| **Vite**         | Herramienta de build rápida para proyectos modernos. |
| **ESLint**       | Linter para mantener código limpio y consistente.    |

---

## Estructura del Proyecto

```
project_digital_bakery/
├── public/                 # Archivos estáticos públicos
├── src/                    # Código fuente de la aplicación
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Páginas del sitio (Home, Productos, etc.)
│   └── App.tsx             # Componente raíz de la aplicación
├── index.html              # HTML base del proyecto
├── package.json            # Información del proyecto y dependencias
├── tailwind.config.js      # Configuración de Tailwind CSS
├── vite.config.ts          # Configuración de Vite
└── README.md               # Documentación del proyecto
```

---

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/sjaquer/project_digital_bakery.git
cd project_digital_bakery
```

2. Instala las dependencias:

```bash
npm install
```

---

## Ejecución

Inicia el servidor de desarrollo local:

```bash
npm run dev
```

Accede a la aplicación en tu navegador mediante la URL:

```
http://localhost:5173
```

---

## Próximas Funcionalidades

* Sistema de autenticación y registro de usuarios.
* Panel de administración para gestionar productos, categorías y pedidos.
* Integración con pasarelas de pago como Stripe o PayPal.
* Notificaciones por correo electrónico al completar pedidos.
* Historial de pedidos para usuarios registrados.

---

## Contribuciones

Contribuciones son bienvenidas. Para colaborar:

1. Realiza un fork del repositorio.
2. Crea una nueva rama:

```bash
git checkout -b feature/nueva-funcionalidad
```

3. Realiza tus cambios y haz commit:

```bash
git commit -m "Agrega nueva funcionalidad"
```

4. Sube los cambios:

```bash
git push origin feature/nueva-funcionalidad
```

5. Abre un Pull Request describiendo tus cambios.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

