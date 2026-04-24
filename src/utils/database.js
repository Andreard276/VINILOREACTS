// Simulación de base de datos usando localStorage

const DB_KEY = 'vinilostoreDB';

export const initializeDB = () => {
  const existing = localStorage.getItem(DB_KEY);
  if (!existing) {
    const initialDB = {
      users: [
        { id: 1, email: 'admin@vinilo.com', password: 'admin123', name: 'Administrador', role: 'admin' }
      ],
      products: [
        { id: 1, title: 'Abbey Road', artist: 'The Beatles', price: 29.99, description: 'Edición clásica remasterizada', public: true, image: 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg' },
        { id: 2, title: 'Dark Side of the Moon', artist: 'Pink Floyd', price: 24.99, description: 'Vinilo 180g edición 50 aniversario', public: true, image: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_side_of_the_moon.png' },
        { id: 3, title: 'Back in Black', artist: 'AC/DC', price: 19.99, description: 'Portada icónica, excelente estado', public: true, image: 'https://upload.wikimedia.org/wikipedia/en/c/c6/Back_in_black.png' },
        { id: 4, title: 'Rumours', artist: 'Fleetwood Mac', price: 21.99, description: 'Pressing original', public: true, image: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Rumours_front.jpg' },
        { id: 5, title: 'Led Zeppelin IV', artist: 'Led Zeppelin', price: 34.99, description: 'Vinilo doble, edición limitada', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_IV.jpg' },
        { id: 6, title: 'Hotel California', artist: 'Eagles', price: 25.99, description: 'Masterpiece del rock americano', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/0/01/Eagles_-_Hotel_California_%281976%29_-_Front.jpg' },
        { id: 7, title: 'A Night at the Opera', artist: 'Queen', price: 27.99, description: 'Colección de greatest hits en vinilo', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/9/97/Queen_A_Night_at_the_Opera.png' },
        { id: 8, title: 'Thriller', artist: 'Michael Jackson', price: 28.99, description: 'Álbum más vendido de todos los tiempos', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Thriller_cover.jpg' },
        { id: 9, title: 'Like a Prayer', artist: 'Madonna', price: 22.99, description: 'Edición 2020 remasterizada', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Madonna_Like_a_Prayer.png' },
        { id: 10, title: 'Machine Head', artist: 'Deep Purple', price: 26.99, description: 'Smoke on the Water clásico', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Deep_Purple-_Machine_Head.jpg' },
        { id: 11, title: 'The Wall', artist: 'Pink Floyd', price: 35.99, description: 'Doble álbum legendario', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/1/11/The_Wall_cover.jpg' },
        { id: 12, title: 'Nevermind', artist: 'Nirvana', price: 30.99, description: 'Edición especial 30 años', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/b/b7/Nevermind.jpg' },
        { id: 13, title: 'Born to Run', artist: 'Bruce Springsteen', price: 26.99, description: 'Clásico americano del rock', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/4/4b/BornToRunalbumcover.jpg' },
        { id: 14, title: 'Electric Ladyland', artist: 'Jimi Hendrix', price: 32.99, description: 'Psicadelia pura', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Hendrix-ElectricLadyland.jpg' },
        { id: 15, title: 'Let It Be', artist: 'The Beatles', price: 29.99, description: 'Último álbum de The Beatles', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/2/25/LetItBe.jpg' },
        { id: 16, title: 'Appetite for Destruction', artist: "Guns N' Roses", price: 31.99, description: 'Debut clásico del rock duro', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/f/f7/AppetiteForDestruction.jpg' },
        { id: 17, title: 'The Joshua Tree', artist: 'U2', price: 28.99, description: 'Rock alternativo épico', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/3/3f/U2_-_The_Joshua_Tree.jpg' },
        { id: 18, title: 'Exile on Main St', artist: 'The Rolling Stones', price: 33.99, description: 'Masterpiece del blues rock', public: false, image: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Exile_on_main_st.jpg' }
      ],
      sessions: {}
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialDB));
  }
};

const getDB = () => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
  } catch (e) {
    return {};
  }
};

const saveDB = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// USER FUNCTIONS
export const registerUser = (email, password, name) => {
  const db = getDB();
  
  // Validar que el email no exista
  if (db.users.some(u => u.email === email)) {
    return { success: false, message: 'El email ya está registrado' };
  }
  
  const newUser = {
    id: Math.max(...db.users.map(u => u.id), 0) + 1,
    email,
    password,
    name,
    role: 'user'
  };
  
  db.users.push(newUser);
  saveDB(db);
  
  return { success: true, message: 'Registro exitoso', user: { id: newUser.id, email, name } };
};

export const loginUser = (email, password) => {
  const db = getDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Email o contraseña incorrectos' };
  }
  
  return { success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
};

export const getAllUsers = () => {
  const db = getDB();
  return db.users.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role }));
};

export const deleteUser = (id) => {
  const db = getDB();
  db.users = db.users.filter(u => u.id !== id);
  saveDB(db);
  return { success: true };
};

// PRODUCT FUNCTIONS
export const getAllProducts = () => {
  const db = getDB();
  return db.products;
};

export const addProduct = (title, artist, price, description) => {
  const db = getDB();
  const newProduct = {
    id: Math.max(...db.products.map(p => p.id), 0) + 1,
    title,
    artist,
    price: parseFloat(price),
    description
  };
  
  db.products.push(newProduct);
  saveDB(db);
  
  return { success: true, product: newProduct };
};

export const updateProduct = (id, title, artist, price, description) => {
  const db = getDB();
  const product = db.products.find(p => p.id === id);
  
  if (!product) {
    return { success: false, message: 'Producto no encontrado' };
  }
  
  product.title = title;
  product.artist = artist;
  product.price = parseFloat(price);
  product.description = description;
  
  saveDB(db);
  return { success: true, product };
};

export const deleteProduct = (id) => {
  const db = getDB();
  db.products = db.products.filter(p => p.id !== id);
  saveDB(db);
  return { success: true };
};
