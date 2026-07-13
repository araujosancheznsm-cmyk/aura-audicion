-- Migration to enrich hearing aids with thin/sparse information to make them more complete and uniform in terms of content.
-- All data is based on real specifications for Oticon and Unitron models.

-- 1. Oticon BTE JET2 PP
UPDATE public.hearing_aids
SET faqs = '[
  {"q": "¿Para qué tipo de pérdida auditiva está diseñado?", "a": "El formato PP (Plus Power) está diseñado para pérdidas auditivas de moderadas a severas, ofreciendo una alta ganancia sin distorsión."},
  {"q": "¿Qué pila utiliza y cuál es su duración?", "a": "Utiliza pila de tamaño 13 (color naranja). Dependiendo de las horas de uso diario, la pila dura aproximadamente entre 7 y 10 días."},
  {"q": "¿Cuenta con telebobina (T-Coil)?", "a": "Sí, este modelo incorpora telebobina para facilitar la conexión en salas de teatro, cines e iglesias equipadas con bucle de inducción magnética."}
]'::jsonb
WHERE slug = 'oticon-bte-jet2-pp';

-- 2. Oticon BTE JET1 PP
UPDATE public.hearing_aids
SET faqs = '[
  {"q": "¿Cuál es la diferencia entre el JET1 PP y el JET2 PP?", "a": "El JET1 PP cuenta con un procesamiento de señal más avanzado con mayor número de canales (48 canales de procesamiento) para una mejor resolución y reducción de ruido en entornos más dinámicos."},
  {"q": "¿Requiere molde personalizado?", "a": "Sí, debido a su alta potencia, se recomienda encarecidamente un molde a la medida del conducto auditivo para evitar filtraciones de sonido que causen silbidos o retroalimentación."},
  {"q": "¿Tiene conectividad directa al celular?", "a": "No cuenta con streaming de audio directo vía Bluetooth de fábrica. Requiere accesorios compatibles como ConnectClip para la transmisión de llamadas."}
]'::jsonb
WHERE slug = 'oticon-bte-jet1-pp';

-- 3. Oticon BTE JET PX2 MINIBTE T
UPDATE public.hearing_aids
SET faqs = '[
  {"q": "¿Qué ventajas ofrece el formato MiniBTE T?", "a": "Es un diseño retroauricular muy discreto y compacto que a la vez mantiene un control físico de volumen/programas y la bobina de inducción magnética (telecoil) integrada."},
  {"q": "¿Qué tipo de pila utiliza?", "a": "Utiliza una pila tamaño 312 (color marrón), la cual ofrece un excelente equilibrio entre tamaño compacto del audífono y una autonomía de 5 a 7 días de uso."},
  {"q": "¿Es resistente al sudor y la humedad?", "a": "Sí, el audífono cuenta con un nano-recubrimiento hidrófugo que lo protege de la humedad y el polvo, garantizando su durabilidad en el uso diario."}
]'::jsonb
WHERE slug = 'oticon-bte-jet-px2-minibte-t';

-- 4. Oticon BTE ZIRCON1 MINIBTE R
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato MiniBTE R recargable de diseño ultra compacto.",
    "Construido sobre la plataforma Polaris de última generación.",
    "OpenSound Navigator esencial para una escucha equilibrada en 360°.",
    "Tecnología Bluetooth de 2.4 GHz para streaming directo de audio.",
    "Batería recargable de Ion-Litio integrada de carga rápida.",
    "Carga rápida de 30 minutos que proporciona hasta 6 horas de uso.",
    "Clasificación IP68 de alta resistencia al agua, sudor y polvo.",
    "Compatible con la aplicación Oticon Companion y ajustes remotos."
  ]'::jsonb,
  benefits = '[
    "Olvídate de comprar y cambiar pilas desechables con su cómoda base de carga.",
    "Mayor claridad de la palabra en reuniones familiares y entornos sociales.",
    "Escucha llamadas, videos y música directamente en tus oídos.",
    "Diseño ergonómico y discreto que se adapta cómodamente detrás de la oreja.",
    "Soporte profesional continuo en nuestro centro audiológico Aura Audición."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Cuál es la diferencia entre Zircon 1 y Zircon 2?", "a": "El Zircon 1 es el modelo de nivel esencial que prioriza una excelente relación calidad-precio manteniendo la tecnología de sonido 360° simplificada y conectividad completa."},
    {"q": "¿Cuánto dura la batería con una sola carga?", "a": "Ofrece hasta 24 horas de autonomía con una carga completa de 3 horas, incluyendo varias horas de streaming de llamadas y música."},
    {"q": "¿Es compatible con cargadores portátiles?", "a": "Sí, es compatible con el cargador portátil Oticon SmartCharger, que funciona como un powerbank para tus audífonos."}
  ]'::jsonb
WHERE slug = 'oticon-bte-zircon1-minibte-r';

-- 5. Oticon BTE ZIRCON1 MINIRITE R
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato MiniRITE R (receptor en el conducto) altamente estético.",
    "Procesamiento ultra rápido en la plataforma Polaris.",
    "OpenSound Navigator esencial para filtrar ruidos molestos.",
    "Bluetooth Low Energy para transmisión de audio binaural stable.",
    "Batería de Ion-Litio con sistema de carga rápida integrado.",
    "30 minutos de carga rápida equivalen a 6 horas adicionales de uso.",
    "Protección IP68 contra polvo y humedad.",
    "Compatible con la aplicación móvil Oticon Companion."
  ]'::jsonb,
  benefits = '[
    "Máxima discreción estética gracias al cable ultrafino del receptor.",
    "Escucha cómoda sin el esfuerzo de concentrarte en entornos con ruido.",
    "Transmisión directa de llamadas telefónicas y música desde tu smartphone.",
    "Carga simple por la noche para usar todo el día con total confianza.",
    "Ajuste personalizado por el audiólogo y adaptabilidad a tu estilo de vida."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Qué significa el formato MiniRITE?", "a": "Significa Receiver-in-the-Ear (receptor en el oído). El cuerpo del audífono va detrás de la oreja y el auricular se ubica dentro del conducto auditivo, logrando mayor claridad y discreción."},
    {"q": "¿Sirve para pérdidas severas?", "a": "Sí, gracias a la posibilidad de acoplar receptores de diferentes potencias (Medium, Power), puede adaptarse a pérdidas desde leves hasta severas."},
    {"q": "¿Se conecta directo a la televisión?", "a": "Sí, mediante el accesorio opcional Oticon TV Adapter 3.0, puedes transmitir el sonido del televisor directo a tus audífonos con calidad digital."}
  ]'::jsonb
WHERE slug = 'oticon-bte-zircon1-minirite-r';

-- 6. Oticon CIC RIA DER / IZQ
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato CIC (Completely-in-the-Canal) hecho 100% a medida.",
    "Diseño anatómico personalizado a partir de un molde físico de tu oído.",
    "Plataforma de procesamiento digital de sonido Ria.",
    "Aprovechamiento natural de la resonancia de tu pabellón auricular.",
    "Sistema automático de reducción de ruido ambiental.",
    "Cancelación activa de retroalimentación para evitar molestos silbidos.",
    "Hilo de extracción transparente e invisible para retirarlo fácilmente.",
    "Alimentación mediante micro pila tamaño 10 (color amarillo)."
  ]'::jsonb,
  benefits = '[
    "Prácticamente invisible a los ojos de los demás, ideal para la máxima discreción.",
    "No interfiere con el uso de lentes, mascarillas o sombreros.",
    "Localización natural del sonido gracias a su posición dentro del canal auditivo.",
    "Ajuste sumamente cómodo al seguir de forma exacta las curvas de tu conducto.",
    "Fácil transporte y almacenamiento en estuches ultra reducidos."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Es difícil de colocar o retirar?", "a": "No, está diseñado con la forma exacta de tu conducto por lo que entra de manera natural y se retira jalando de un hilo de extracción transparente muy resistente."},
    {"q": "¿Cuenta con conexión Bluetooth?", "a": "Debido a su tamaño extremadamente reducido, no incluye antenas inalámbricas ni Bluetooth. Si buscas conectividad, te recomendamos formatos ITC o retroauriculares."},
    {"q": "¿Cuánto tiempo toma su fabricación?", "a": "El proceso requiere la toma de una impresión física del canal en nuestro consultorio y toma aproximadamente entre 5 a 7 días hábiles de laboratorio."}
  ]'::jsonb
WHERE slug IN ('oticon-cic-ria-der', 'oticon-cic-ria-izq');

-- 7. Oticon ITC GET DER / IZQ
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato ITC (In-the-Canal) a medida, discreto y cómodo.",
    "Confeccionado de manera única según el molde de tu conducto.",
    "Plataforma de sonido Get de Oticon con tecnología digital confiable.",
    "Control de volumen físico o pulsador integrado opcional.",
    "Micrófono direccional para mejor enfoque en la voz de tu interlocutor.",
    "Sistema de reducción de ruido y control de retroalimentación.",
    "Utiliza pila tamaño 312 (color marrón) de mayor duración.",
    "Recubrimiento hidrófugo protector contra humedad y cerumen."
  ]'::jsonb,
  benefits = '[
    "Excelente equilibrio entre invisibilidad y facilidad de control manual.",
    "Mayor duración de batería en comparación con audífonos CIC más pequeños.",
    "Mejor entendimiento en conversaciones cara a cara gracias a la direccionalidad.",
    "Fácil manipulación para personas con menor destreza motriz.",
    "Calidad de sonido digital estable y fiel para el día a día."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Cuál es la diferencia entre un audífono ITC y uno CIC?", "a": "El ITC es ligeramente más grande, lo que le permite alojar una pila de mayor duración (312), micrófonos direccionales y controles de volumen físicos que los CIC no suelen tener."},
    {"q": "¿Cómo se limpia el audífono?", "a": "Se limpia diariamente con un cepillo suave y un paño seco provistos en el kit. También se deben cambiar periódicamente los filtros anticerumen para evitar obstrucciones."},
    {"q": "¿Sirve para pérdidas auditivas severas?", "a": "Principalmente está indicado para pérdidas auditivas de leves a moderadas. Para pérdidas severas, el audiólogo evaluará si la ganancia del formato ITC es suficiente o si requiere un retroauricular."}
  ]'::jsonb
WHERE slug IN ('oticon-itc-get-der', 'oticon-itc-get-izq');

-- 8. Unitron BTE ATIVO SP
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato BTE Super Power diseñado para pérdidas auditivas severas.",
    "Alta salida de sonido y ganancia acústica excepcional.",
    "Controles físicos duales integrados (volumen y selección de programas).",
    "Micrófonos direccionales para mejorar la comprensión de la palabra.",
    "Avanzado sistema de cancelación de retroalimentación activa.",
    "Compatibilidad óptima con moldes acrílicos o de silicona a medida.",
    "Utiliza pila de alta capacidad tamaño 675 (color azul).",
    "Entrada directa de audio y compatibilidad con sistemas FM."
  ]'::jsonb,
  benefits = '[
    "Máxima potencia y fidelidad sonora para usuarios con pérdidas auditivas severas.",
    "Durabilidad extrema gracias a su carcasa robusta resistente al polvo y humedad.",
    "Autonomía excepcional de pila, reduciendo la frecuencia de reemplazos a cada 15 días.",
    "Acceso claro a los sonidos del habla y señales de alerta cotidianas.",
    "Excelente relación calidad-precio en soluciones potentes."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Por qué es importante usar molde personalizado con este modelo?", "a": "Al ser un audífono de alta ganancia (súper potente), cualquier espacio libre entre el oído y el audífono puede causar retroalimentación acústica (silbidos). El molde a medida garantiza un sellado perfecto."},
    {"q": "¿Cuánto dura la batería?", "a": "La pila tamaño 675 es la de mayor tamaño en el mercado y proporciona una excelente duración de aproximadamente 15 a 20 días de uso diario."},
    {"q": "¿Tiene conexión Bluetooth?", "a": "Este modelo está enfocado en máxima amplificación y confiabilidad analógica tradicional, por lo que no cuenta con Bluetooth. Si requiere conectividad, consulte la línea Moxis."}
  ]'::jsonb
WHERE slug = 'unitron-bte-ativo-sp';

-- 9. Unitron BTE T MAX UP 600
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato BTE Ultra Power (UP) para las pérdidas auditivas más severas.",
    "Ganancia acústica máxima superior a 80 dB para amplificación crítica.",
    "Telebobina integrada de alto rendimiento para bucle magnético.",
    "Procesamiento inteligente de sonido de la plataforma Max.",
    "Controles manuales dedicados para volumen y selección de programa.",
    "Cancelación de retroalimentación dinámica y adaptativa.",
    "Compatible con sistemas FM educativos y zapatas de audio directo.",
    "Utiliza batería tamaño 675 de larga duración."
  ]'::jsonb,
  benefits = '[
    "Máximo nivel de ganancia disponible para que vuelvas a escuchar tu entorno.",
    "Excelente comprensión del habla en ambientes ruidosos mediante algoritmos avanzados.",
    "Totalmente compatible con tecnologías escolares/académicas (FM).",
    "Construcción duradera pensada para el uso intensivo diario.",
    "Fácil manejo manual de todas las funciones directamente en el audífono."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Qué significa el formato UP (Ultra Power)?", "a": "Es la categoría de audífonos con mayor potencia del mercado, diseñada para personas que tienen una pérdida auditiva profunda y necesitan una amplificación muy elevada para percibir el sonido."},
    {"q": "¿Se puede usar en escuelas u oficinas?", "a": "Sí, es totalmente compatible con sistemas FM y receptores inalámbricos para aulas a través de la entrada directa de audio o telebobina."},
    {"q": "¿Es digital?", "a": "Sí, cuenta con un procesador digital multicanal que optimiza el sonido del habla frente al ruido, evitando que el volumen alto sea molesto."}
  ]'::jsonb
WHERE slug = 'unitron-bte-t-max-up-600';

-- 10. Unitron BTE T MOXI FIT 600
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato MiniRITE elegante y sumamente discreto.",
    "Basado en la avanzada plataforma Vivante de Unitron.",
    "Clasificación automática SoundNav 3.0 para adaptación a los entornos.",
    "Bluetooth con conectividad universal de 2.4 GHz integrada.",
    "Streaming directo estéreo para dispositivos iOS y Android.",
    "Telebobina (T-Coil) integrada para bucle de inducción.",
    "Pulsador físico personalizable para volumen o cambio de programa.",
    "Alimentación mediante pila tamaño 312 de bajo consumo."
  ]'::jsonb,
  benefits = '[
    "Ajuste automático inteligente sin necesidad de presionar botones.",
    "Disfruta de música, videos y llamadas directamente en tu audífono.",
    "Discreción superior con un diseño galardonado por su ergonomía.",
    "Acceso inalámbrico a audio público en teatros y salas equipadas.",
    "Control de volumen fácil desde la app Remote Plus en tu celular."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Qué es la clasificación SoundNav 3.0?", "a": "Es un sistema que analiza el ambiente acústico constantemente y ajusta la configuración del audífono de forma automática para optimizar la palabra en silencio, ruido, música o conversación grupal."},
    {"q": "¿Es compatible con cualquier teléfono?", "a": "Sí, se conecta de forma directa a smartphones Apple (MFi) y Android (ASHA/Bluetooth clásico) para streaming de audio y control de la app."},
    {"q": "¿Es recargable?", "a": "Este modelo utiliza pilas 312 desechables. Si prefieres la comodidad de carga por cable/base, te recomendamos la versión Moxi M-R o Moxi V-R."}
  ]'::jsonb
WHERE slug = 'unitron-bte-t-moxi-fit-600';

-- 11. Unitron BTE T MOXI V1 R
UPDATE public.hearing_aids
SET 
  benefits = '[
    "Comodidad absoluta al cargar tus audífonos por la noche y usarlos todo el día.",
    "Sonido rico y natural gracias a la plataforma Vivante y su análisis de sonido.",
    "Conversaciones más claras al teléfono gracias al streaming directo manos libres.",
    "Facilidad de uso e independencia de pilas pequeñas.",
    "Soporte postventa integral y calibración profesional en Lima."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Cuánto dura la carga de la batería?", "a": "Ofrece hasta 24 horas de uso continuo con una sola carga de 3 horas, o unas 18 horas incluyendo 5 horas de streaming directo de audio."},
    {"q": "¿Tiene telebobina?", "a": "Sí, cuenta con bobina telefónica integrada para mejorar la inteligibilidad en lugares públicos con sistemas de inducción magnética."},
    {"q": "¿Cómo funciona la garantía?", "a": "El audífono cuenta con 1 año de garantía oficial de fábrica que cubre cualquier defecto de fabricación, además de mantenimiento preventivo en Aura Audición."}
  ]'::jsonb
WHERE slug = 'unitron-bte-t-moxi-v1-r';

-- 12. Unitron ITC INSERA 600 DER / IZQ
UPDATE public.hearing_aids
SET 
  features = '[
    "Formato ITC (In-the-Canal) discreto hecho 100% a medida.",
    "Confeccionado a partir de la morfología exacta de tu conducto auditivo.",
    "Plataforma inteligente Vivante de procesamiento digital.",
    "Conectividad Bluetooth integrada para streaming directo.",
    "SoundNav automático que clasifica diferentes entornos acústicos.",
    "Compatible con la aplicación móvil Remote Plus.",
    "Alimentación de energía confiable mediante pila tamaño 312."
  ]'::jsonb,
  benefits = '[
    "Discreción excelente junto a tecnologías inalámbricas avanzadas.",
    "Transmisión directa de llamadas telefónicas y música sin accesorios externos.",
    "Audición adaptada de forma natural al contorno de tus propios oídos.",
    "Ajustes manuales y remotos rápidos desde tu smartphone.",
    "Confort máximo para uso diario y prolongado."
  ]'::jsonb,
  faqs = '[
    {"q": "¿Es visible para otras personas?", "a": "Al ser un audífono intra-conducto a medida, queda alojado dentro del canal del oído, resultando significativamente discreto y discreto frente a modelos retroauriculares tradicionales."},
    {"q": "¿Cómo se conecta a mi teléfono?", "a": "Se empareja directamente a través del menú de Bluetooth de tu celular, permitiéndote recibir llamadas directamente en el oído derecho, izquierdo o ambos de forma estéreo."},
    {"q": "¿Qué mantenimiento requiere?", "a": "Requiere la limpieza diaria de cerumen con las herramientas provistas y el reemplazo del filtro protector de cera para evitar obstrucciones que apaguen el sonido."}
  ]'::jsonb
WHERE slug IN ('unitron-itc-insera-600-der', 'unitron-itc-insera-600-izq');
