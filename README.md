# Apex Fit

## Descripción

Apex Fit es una aplicación web diseñada para atletas de diversas disciplinas como CrossFit, Running y Gimnasio Convencional. La aplicación permite a los usuarios llevar un registro detallado de sus avances en diferentes ejercicios, facilitando el seguimiento de su progreso y el establecimiento de nuevas metas.

## Características

- Registro de ejercicios y rutinas personalizadas.
- Seguimiento del progreso en tiempo real.
- Gráficas y estadísticas de rendimiento.
- Integración con dispositivos de seguimiento de actividad física.
- Comunidad de usuarios para compartir logros y motivación.

## Tecnologías Utilizadas

- **Base de datos**: PostgreSQL
- **Frontend**: Angular
- **Backend**: NestJS
- **Monorepo**: Nx

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/novahdev/apex-fit.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd apex-fit
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Inicia el servidor de desarrollo:
    ```bash
    nx serve api
    ```
2. Inicia la aplicación web:
    ```bash
    nx serve web
    ```
3. Abre tu navegador y navega a `http://localhost:7040` para ver la aplicación en acción.

## Contribución

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.