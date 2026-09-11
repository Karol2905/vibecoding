# Vibe Report — EcoTrack MVP
**Proyecto Integrador · Vibe Coding**
**Fecha:** Septiembre 2026

---

## 1. Configuración del Agente: Las Reglas del Juego

El primer paso fue definir el archivo `.cursorrules`, que funciona como el "contrato de trabajo" entre el desarrollador y la IA. En lugar de explicar el contexto en cada prompt, este archivo le comunica al agente de forma persistente: el stack elegido (Next.js 14 + Tailwind + shadcn/ui), los factores de emisión de CO2 que debe usar, las convenciones de carpetas del proyecto y las prohibiciones técnicas no negociables (sin `any`, sin CSS inline, sin claves de API expuestas).

La configuración más valiosa fue definir **cómo quería que el agente respondiera**: primero explicar qué va a hacer, luego el código, y al final el siguiente paso lógico. Esto convirtió cada respuesta de la IA en una sesión de pair programming estructurada, no en un volcado de código sin contexto.

---

## 2. Dificultades al Delegar Código a la IA

**El problema del contexto perdido.** La IA no recuerda las decisiones previas de la sesión. Cuando cambié de ventana y volví, tuve que re-contextualizar el estado actual del proyecto. La solución fue mantener un archivo `CONTEXT.md` en el repo con el estado actual del MVP.

**La tentación de corregir manualmente.** En dos ocasiones, mi instinto fue editar el código generado directamente. Me detuve y lo redescribí al agente como un nuevo requerimiento. El resultado fue mejor: la IA no solo corrigió el bug, sino que refactorizó la función afectada con un enfoque más limpio que el que yo hubiera escrito.

**El parsing de lenguaje natural fue el reto real.** Pedirle a la IA que interprete "Hoy comí carne y viajé 20km en bus" requirió varias iteraciones de prompt engineering para que extrajera entidades (alimento, distancia, medio de transporte) con suficiente tolerancia a variaciones del español.

---

## 3. De "Escribir Código" a "Orquestar una Visión"

El cambio más profundo no fue técnico, sino mental.

Escribir código es un acto de traducción: convertir una idea en sintaxis válida, línea por línea. **Orquestar una visión es un acto de comunicación**: transmitirle a la IA la intención, el tono, las restricciones y el resultado esperado con suficiente precisión para que ella ejecute sin ambigüedad.

En la práctica, esto significó pasar más tiempo pensando en *qué problema quiero resolver* que en *cómo resolverlo*. La pregunta cambió de "¿cómo parseo este string en JavaScript?" a "¿qué experiencia quiero que tenga el usuario cuando escribe su día en lenguaje natural?".

El Vibe Coding no elimina la responsabilidad técnica: la eleva. El desarrollador se convierte en arquitecto, editor y curador. La IA produce el borrador; el humano decide si ese borrador sirve a la visión del producto.

---

## Resultado

EcoTrack MVP quedó desplegado en Replit con una interfaz funcional donde el usuario escribe su día en español y obtiene un estimado de su huella de carbono en kg de CO2e, con un desglose por categoría (alimentación, transporte) y una comparación contextual ("equivale a cargar tu teléfono 847 veces").

El tiempo total desde el primer prompt hasta el despliegue: **4 horas**.
Líneas de código escritas manualmente: **menos de 20**.

---

*"El mejor código es el que nunca tuviste que escribir porque le explicaste bien el problema a alguien que sí sabe cómo hacerlo."*
