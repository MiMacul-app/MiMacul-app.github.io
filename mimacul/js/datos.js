// Datos de MiMacul: pymes, productos, categorías, noticias, etc.
// Para agregar o editar una pyme o un producto, cambia este archivo.

/* =========================================================
   4. DATOS
   En una app real esto vendría de una base de datos.
   Aquí son datos de ejemplo escritos a mano.
   ========================================================= */
const PYMES = [
  { id: "panem", nombre: "Panem", corto: "Panem", emoji: "🥖", logo: IMAGENES.panemLogo, grad: ["#f6d7a8", "#e39a48"], rubro: "panaderia", rubroTxt: "Panadería", dir: "Av. Quilín 3115", km: "1,2", rating: "4,8", resenas: 126, abre: "08:00", cierra: "20:00", bio: "Panadería artesanal dedicada a la elaboración de panes frescos y productos de repostería. Ofrece preparaciones ideales para compartir en familia." },
  { id: "el-menu", nombre: "El Menú", corto: "El Menú", emoji: "🥬", logo: IMAGENES.elMenuLogo, grad: ["#d6eedd", "#8cc7a8"], rubro: "verduleria", rubroTxt: "Verdulería", dir: "Los Olmos 3967", km: "0,9", rating: "4,7", resenas: 89, abre: "09:00", cierra: "20:00", bio: "Verdulería local dedicada a ofrecer frutas y verduras frescas para el consumo diario. Cuenta con productos de temporada y alternativas de despacho." },
  { id: "raudem", nombre: "RAUDEM", corto: "RAUDEM", emoji: "🧶", logo: IMAGENES.raudemLogo, logoLleno: true, grad: ["#efe2c6", "#c9a66b"], rubro: "artesania", rubroTxt: "Artesanía", dir: "Av. Quilín 3151", km: "1,3", rating: "4,9", resenas: 42, horarioTxt: "Consultar disponibilidad", cierra: "", bio: "Red de artesanos urbanos que reúne creaciones hechas a mano, utilizando técnicas tradicionales y materiales naturales. Cada pieza representa el trabajo y creatividad de emprendedores locales." },
  { id: "cascanueces", nombre: "Café Cascanueces", corto: "Cascanueces", emoji: "☕", logo: IMAGENES.cascaLogo, grad: ["#ead8c8", "#b98a63"], rubro: "despensa", rubroTxt: "Café y despensa", dir: "Exequiel Fernández 2301", km: "2,0", rating: "4,9", resenas: 105, abre: "10:00", cierra: "19:00", bio: "Tostaduría especializada en café de distintos orígenes. Ofrece granos seleccionados, mezclas propias y productos para los amantes del café." },
  { id: "el-huerto", nombre: "El Huerto", corto: "El Huerto", emoji: "🌱", logo: IMAGENES.huertoLogo, logoLleno: true, grad: ["#cfe3c4", "#2f5a3c"], rubro: "verduleria", rubroTxt: "Huerto y despensa", dir: "Av. Marathon 3929", km: "0,8", rating: "4,8", resenas: 57, abre: "09:00", cierra: "19:00", bio: "Emprendimiento dedicado a ofrecer productos frescos de origen vegetal, ideales para una alimentación variada y preparaciones saludables." },
  { id: "reina-luisa", nombre: "Apícola Reina Luisa Kohnert", corto: "Reina Luisa", emoji: "🐝", logo: IMAGENES.reinaLuisaLogo, logoLleno: true, grad: ["#fff1c6", "#f5c14e"], rubro: "despensa", rubroTxt: "Productos apícolas", dir: "Macul, Santiago", km: "1,5", rating: "4,9", resenas: 38, horarioTxt: "Consultar disponibilidad", cierra: "", bio: "Emprendimiento de rubro apícola enfocado en productos derivados del trabajo de las abejas. Una propuesta natural para quienes disfrutan de productos de origen apícola." },
  { id: "casa-ojeda", nombre: "Decoraciones CasaOjeda", corto: "CasaOjeda", emoji: "🏠", logo: IMAGENES.ojedaLogo, logoLleno: true, grad: ["#dfe6f3", "#8fa3c9"], rubro: "decoracion", rubroTxt: "Decoración y hogar", dir: "Av. Macul 3998, local C", km: "1,1", rating: "4,8", resenas: 64, abre: "10:00", cierra: "19:00", nueva: true, bio: "Tienda dedicada a la decoración del hogar y accesorios para ambientar distintos espacios. Encuentra objetos decorativos y alternativas para darle personalidad a tu casa." },
  { id: "cocina-libre", nombre: "Cocina Libre", corto: "Cocina Libre", emoji: "🧁", logo: IMAGENES.cocinaLogo, logoLleno: true, grad: ["#fde3c4", "#f2994a"], rubro: "panaderia", rubroTxt: "Pastelería vegana", dir: "Arturo Gordon 3908, local D", km: "1,6", rating: "5,0", resenas: 69, fuenteResenas: "Google", horarioTxt: "Abierto de martes a domingo", horario: [["Martes a viernes", "15:00 a 19:30"], ["Sábado", "11:00 a 19:30"], ["Domingo", "11:00 a 15:00"], ["Lunes", "Cerrado"]], cierra: "", nueva: true, bio: "Pastelería artesanal especializada en preparaciones 100% veganas. Sus productos utilizan ingredientes de origen vegetal y están inspirados en la naturaleza chilena. Elaboran tortas personalizadas para distintas ocasiones." },
];

const PRODUCTOS = [
  { id: "pan-masa-madre", pyme: "panem", nombre: "Pan de masa madre", emoji: "🥖", img: IMAGENES.panemMasaMadre, precio: 3200, det: "800 g", rating: "4,8", n: 126, grad: ["#f6d7a8", "#e9a85b"], desc: "Fermentación lenta de 24 horas, corteza crujiente y miga húmeda. Elaborado artesanalmente." },
  { id: "hallullas", pyme: "panem", nombre: "Hallullas artesanales", emoji: "🫓", img: IMAGENES.panemHallullas, precio: 2000, det: "6 unidades", rating: "4,7", n: 84, grad: ["#fbe8c8", "#e8b878"], desc: "Pan tradicional chileno, de textura suave y sabor ligeramente tostado. Ideal para desayunos y once." },
  { id: "pie-limon", pyme: "panem", nombre: "Pie de limón", emoji: "🥧", img: IMAGENES.panemPieLimon, precio: 8500, det: "6 porciones", rating: "4,9", n: 52, grad: ["#fdf3c4", "#f2cf5a"], desc: "Base crujiente, relleno cremoso de limón y cubierta de merengue dorado." },
  { id: "palta-hass", pyme: "el-menu", nombre: "Palta Hass", emoji: "🥑", img: IMAGENES.elMenuPalta, precio: 3990, det: "1 kg", rating: "4,9", n: 65, grad: ["#e0efcf", "#9cc56f"], desc: "Paltas de textura cremosa y sabor suave, ideales para ensaladas, tostadas y preparaciones caseras." },
  { id: "tomate", pyme: "el-menu", nombre: "Tomate de ensalada", emoji: "🍅", img: IMAGENES.elMenuTomate, precio: 1790, det: "1 kg", rating: "4,7", n: 48, grad: ["#fbd6cc", "#ea7c62"], desc: "Tomates frescos y jugosos, ideales para ensaladas y acompañamientos." },
  { id: "zanahorias", pyme: "el-menu", nombre: "Zanahorias", emoji: "🥕", img: IMAGENES.elMenuZanahorias, precio: 990, antes: 1190, det: "1 kg", rating: "4,8", n: 31, grad: ["#fde0c4", "#f0a35a"], desc: "Zanahorias frescas y crujientes, perfectas para ensaladas, jugos y guisos." },
  { id: "mantel-bordado", pyme: "raudem", nombre: "Mantel bordado artesanal", emoji: "🧵", img: IMAGENES.raudemMantel, precio: 12000, det: "120 × 150 cm", rating: "4,9", n: 18, grad: ["#f4f1ec", "#d9cfc0"], desc: "Mantel confeccionado con detalles bordados a mano y diseños florales." },
  { id: "collar-semillas", pyme: "raudem", nombre: "Collar de semillas", emoji: "📿", img: IMAGENES.raudemCollar, precio: 5500, det: "1 unidad", rating: "4,8", n: 12, grad: ["#efe2c6", "#c9a66b"], desc: "Accesorio artesanal elaborado con semillas naturales y materiales seleccionados." },
  { id: "bolso-textil", pyme: "raudem", nombre: "Bolso textil artesanal", emoji: "👜", img: IMAGENES.raudemBolso, precio: 9000, antes: 10800, det: "1 unidad", rating: "5,0", n: 9, grad: ["#f6e1dc", "#e0a99c"], desc: "Bolso reutilizable con detalles textiles y decoración hecha a mano." },
  { id: "cafe-bolivia", pyme: "cascanueces", nombre: "Café Bolivia Illampu", emoji: "☕", img: IMAGENES.cascaBolivia, precio: 11990, det: "250 g", rating: "4,9", n: 35, grad: ["#ead8c8", "#b98a63"], desc: "Café de origen boliviano con notas aromáticas y perfil equilibrado." },
  { id: "cafe-honduras", pyme: "cascanueces", nombre: "Café Honduras", emoji: "☕", img: IMAGENES.cascaHonduras, precio: 10990, det: "250 g", rating: "4,8", n: 28, grad: ["#ead8c8", "#b98a63"], desc: "Café de origen hondureño, seleccionado para ofrecer una taza aromática y de buen cuerpo." },
  { id: "classic-blend", pyme: "cascanueces", nombre: "Classic Aroma Blend", emoji: "☕", img: IMAGENES.cascaBlend, precio: 9990, antes: 11990, det: "250 g", rating: "4,7", n: 42, grad: ["#ead8c8", "#b98a63"], desc: "Mezcla de granos tostados con aroma intenso, ideal para disfrutar durante cualquier momento del día." },
  { id: "lechuga", pyme: "el-huerto", nombre: "Lechuga fresca", emoji: "🥬", img: IMAGENES.huertoLechuga, precio: 1200, antes: 1400, det: "1 unidad", rating: "4,8", n: 23, grad: ["#e3f0c8", "#a9cf6b"], desc: "Lechuga fresca y crujiente, perfecta para ensaladas y acompañamientos." },
  { id: "pimenton", pyme: "el-huerto", nombre: "Pimentón rojo", emoji: "🫑", img: IMAGENES.huertoPimenton, precio: 1490, det: "500 g", rating: "4,7", n: 16, grad: ["#fbd6cc", "#ea7c62"], desc: "Pimentón fresco y colorido, ideal para salteados, ensaladas y guisos." },
  { id: "espinaca", pyme: "el-huerto", nombre: "Espinaca fresca", emoji: "🥬", img: IMAGENES.huertoEspinaca, precio: 1500, det: "1 paquete", rating: "4,9", n: 18, grad: ["#e3f0c8", "#a9cf6b"], desc: "Hojas verdes frescas, ideales para ensaladas, tortillas y preparaciones saludables." },
  { id: "miel-natural", pyme: "reina-luisa", nombre: "Miel natural", emoji: "🍯", img: IMAGENES.reinaLuisaMiel, precio: 6500, antes: 7800, det: "500 g", rating: "4,9", n: 21, grad: ["#fbe7b5", "#f0ae3c"], desc: "Miel de textura suave y sabor dulce, ideal para acompañar desayunos e infusiones." },
  { id: "propoleo", pyme: "reina-luisa", nombre: "Extracto de propóleo", emoji: "🧴", img: IMAGENES.reinaLuisaPropoleo, precio: 4500, det: "30 ml", rating: "4,8", n: 11, grad: ["#f6e6cf", "#d9a66b"], desc: "Producto apícola elaborado a partir de propóleo. Presentación en frasco gotario." },
  { id: "cera-abeja", pyme: "reina-luisa", nombre: "Cera de abeja", emoji: "🐝", img: IMAGENES.reinaLuisaCera, precio: 3500, det: "100 g", rating: "4,7", n: 6, grad: ["#fff1c6", "#f5c14e"], desc: "Cera natural de abeja para proyectos artesanales y elaboración de productos." },
  { id: "canasto", pyme: "casa-ojeda", nombre: "Canasto decorativo", emoji: "🧺", img: IMAGENES.ojedaCanasto, precio: 8990, det: "1 unidad", rating: "4,8", n: 25, grad: ["#f3e6d3", "#d4b48a"], desc: "Canasto de fibras naturales para organizar objetos y decorar diferentes ambientes." },
  { id: "cuadro", pyme: "casa-ojeda", nombre: "Cuadro decorativo", emoji: "🖼️", img: IMAGENES.ojedaCuadro, precio: 12990, det: "1 unidad", rating: "4,9", n: 20, grad: ["#f4ece2", "#d9b99a"], desc: "Pieza decorativa para complementar paredes y crear ambientes acogedores." },
  { id: "florero", pyme: "casa-ojeda", nombre: "Florero decorativo", emoji: "🏺", img: IMAGENES.ojedaFlorero, precio: 6990, det: "1 unidad", rating: "4,7", n: 19, grad: ["#f6efe3", "#dccdb4"], desc: "Florero de estilo minimalista para complementar mesas, repisas y otros espacios." },
  { id: "torta-chucao", pyme: "cocina-libre", nombre: "Torta Chucao", emoji: "🎂", img: IMAGENES.cocinaChucao, cotizar: true, precio: 0, det: "100% vegana", grad: ["#e9d6c8", "#8a5a3c"], desc: "Torta artesanal inspirada en el ave chilena Chucao, preparada a pedido y con ingredientes de origen vegetal." },
  { id: "torta-chiricoca", pyme: "cocina-libre", nombre: "Torta Chiricoca", emoji: "🎂", img: IMAGENES.cocinaChiricoca, cotizar: true, precio: 0, det: "100% vegana", grad: ["#f0dfcb", "#b07a4a"], desc: "Preparación artesanal de repostería vegana, con opciones de personalización para celebraciones." },
  { id: "cupcakes-veganos", pyme: "cocina-libre", nombre: "Cupcakes veganos", emoji: "🧁", img: IMAGENES.cocinaCupcakes, cotizar: true, precio: 0, det: "100% veganos", grad: ["#ead8c8", "#8a5a3c"], desc: "Pequeños pastelitos de chocolate con decoración cremosa, ideales para compartir y celebrar." },
];

// txt = texto del chip en Inicio; nombre/emoji/grad/desc = tarjeta grande en Explorar
const CATEGORIAS = [
  { id: "todo", txt: "Todo" },
  { id: "panaderia", txt: "🥖 Panaderías", nombre: "Panaderías y repostería", emoji: "🥖", grad: ["#f6d7a8", "#e39a48"], desc: "Pan del día, pasteles y galletas" },
  { id: "verduleria", txt: "🥬 Verdulerías", nombre: "Verdulerías", emoji: "🥬", grad: ["#d6eedd", "#8cc7a8"], desc: "Frutas y verduras frescas" },
  { id: "artesania", txt: "🧶 Artesanía", nombre: "Artesanía", emoji: "🧶", grad: ["#f9d9e0", "#e79bb0"], desc: "Tejidos y piezas hechas a mano" },
  { id: "despensa", txt: "🍯 Despensa", nombre: "Despensa natural", emoji: "🍯", grad: ["#fbe7b5", "#f0ae3c"], desc: "Miel, café, mermeladas y huevos" },
  { id: "decoracion", txt: "🕯️ Decoración", nombre: "Decoración", emoji: "🕯️", grad: ["#efe3f6", "#c3a3dc"], desc: "Velas y detalles para tu casa" }
];

const RESENAS = [
  { quien: "Camila R.", estrellas: 5, txt: "Todo llegó perfecto y súper rápido. Se nota el cariño en lo que hacen." },
  { quien: "Jorge M.", estrellas: 5, txt: "Me encanta poder comprarle a gente del barrio. Atención de primera por WhatsApp." },
  { quien: "Valentina P.", estrellas: 4, txt: "Muy buena calidad. Le pondría una estrella más si tuvieran más horarios de retiro." }
];

// Noticias del carrusel de Inicio (textos de ejemplo).
// Para agregar una noticia, copia una línea y cambia los datos.
const NOTICIAS = [
  { tag: "Nueva pyme 🎉", titulo: "Nueva pyme:<br>CasaOjeda", bajada: "Decoración y hogar<br>Av. Macul 3998, local C", boton: "Conocer", destino: "pyme-casa-ojeda", fondo: IMAGENES.ojedaCanasto, sombra: "22,38,74", grad: ["#2b4478", "#16264a"] },
  { tag: "Feria cultural 🚋", titulo: "Feria Cultural<br>RAUDEM", bajada: "Lun y Vie · 9:00 a 15:00<br>Av. Macul con Av. Quilín", boton: "Ver RAUDEM", destino: "pyme-raudem", fondo: IMAGENES.raudemAfiche, grad: ["#5a3d1c", "#2e1f0e"] },
  { tag: "Cupón 🏷️", titulo: "$1.000 de descuento<br>con BARRIOMACUL", boton: "Ir al carrito", destino: "carrito", emoji: "🎁", grad: ["#a8611a", "#6f3d0c"] }
];
const SEGUNDOS_CARRUSEL = 4; // cada cuántos segundos cambia la noticia

// Fotos de perfil para elegir.
// Ahora son emojis. Para usar una imagen tuya: guarda la imagen en la misma
// carpeta que este .html (por ejemplo en una carpeta "fotos") y cambia una
// línea por algo así:  { img: "fotos/mi-foto.jpg", grad: ["#fdebcb", "#f2a43a"] },
const AVATARES = [
  { emoji: "🙂", grad: ["#fdebcb", "#f2a43a"] },
  { emoji: "😎", grad: ["#d6eedd", "#8cc7a8"] },
  { emoji: "🐱", grad: ["#f9d9e0", "#e79bb0"] },
  { emoji: "🐶", grad: ["#ead8c8", "#b98a63"] },
  { emoji: "🦊", grad: ["#fbe2c8", "#eaa86c"] },
  { emoji: "🐝", grad: ["#fff1c6", "#f5c14e"] },
  { emoji: "🌻", grad: ["#e3f0c8", "#a9cf6b"] },
  { emoji: "🦉", grad: ["#efe3f6", "#c3a3dc"] },
  { img: IMAGENES.gatoPan, grad: ["#fbe2c8", "#eaa86c"] },
  { img: IMAGENES.gatoBusiness, grad: ["#2d3140", "#1b1e28"] }
];

const DESPACHO = 1990;
const CUPONES = { BARRIOMACUL: 1000 };
