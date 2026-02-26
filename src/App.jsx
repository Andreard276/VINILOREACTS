import React, {useEffect, useMemo, useState} from 'react'
import imgBeatles from './images/thebeatles.jpg';
import imgPinkFloyd from './images/pinkfloyd.png';
import imgAC from './images/AC.png';
import imgFleetwood from './images/fleetwood.jpg';


function Header({onOpenCart, cartCount, onSearchChange, search}){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="logo">ViniloStore</h1>
        <div className="header-right">
          <input className="search" value={search} onChange={e=>onSearchChange(e.target.value)} placeholder="Buscar vinilos, artistas..." />
          <nav className="main-nav">
            <a href="#inicio">Inicio</a>
            <a href="#productos">Productos</a>
            <a href="#contacto">Contáctanos</a>
            <a href="#quienes">Quiénes somos</a>
          </nav>
          <button className="cart-btn" onClick={onOpenCart} aria-label="Abrir carrito">
            Carrito <span className="badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h2 className="hero-title">Vinilos con historia y carácter</h2>
          <p className="hero-sub">Ediciones cuidadas, nuevos lanzamientos y clásicos de colección. Envío seguro y asesoría personalizada.</p>
          <a className="btn" href="#productos">Explorar ahora</a>
        </div>
        <div className="hero-art">
          <div className="vinyl-graphic" />
        </div>
      </div>
    </section>
  )
}

function ProductCard({product, onAdd}){
  return (
    <article className="card animate-fade-up">
      <div className="thumb">{product.img ? <img src={product.img} alt={product.title}/> : <div className="placeholder">Portada</div>}</div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="artist">{product.artist}</p>
        <p className="desc">{product.description}</p>
        <div className="card-foot">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className="add" onClick={()=>onAdd(product)}>Añadir</button>
        </div>
      </div>
    </article>
  )
}

function CartDrawer({open, onClose, cartItems, onRemove, onChangeQty}){
  const total = cartItems.reduce((s,i)=>s + i.price * i.qty, 0)
  return (
    <aside className={"cart-drawer "+(open? 'open':'') }>
      <div className="cart-head">
        <h4>Tu carrito</h4>
        <button onClick={onClose}>X</button>
      </div>
      <div className="cart-body">
        {cartItems.length===0 ? <p className="muted">El carrito está vacío</p> : (
          cartItems.map(item=> (
            <div key={item.id} className="cart-row">
              <div className="cart-meta">
                <div className="cart-title">{item.title}</div>
                <div className="cart-artist">{item.artist}</div>
              </div>
              <div className="cart-actions">
                <input type="number" min="1" value={item.qty} onChange={e=>onChangeQty(item.id, Math.max(1, Number(e.target.value)||1))} />
                <button className="remove" onClick={()=>onRemove(item.id)}>Eliminar</button>
              </div>
              <div className="cart-price">${(item.price*item.qty).toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
      <div className="cart-foot">
        <div>Total: <strong>${total.toFixed(2)}</strong></div>
        <button className="btn" disabled={cartItems.length===0}>Ir a pagar</button>
      </div>
    </aside>
  )
}

export default function App(){
  const initial = [
    {id:1,title:'Abbey Road', artist:'The Beatles', price:29.99, description:'Edición clásica remasterizada',img: imgBeatles },
    {id:2,title:'Dark Side of the Moon', artist:'Pink Floyd', price:24.99, description:'Vinilo 180g edición 50 aniversario', img: imgPinkFloyd},
    {id:3,title:'Back in Black', artist:'AC/DC', price:19.99, description:'Portada icónica, excelente estado', img: imgAC},
    {id:4,title:'Rumours', artist:'Fleetwood Mac', price:21.99, description:'Pressing original', img: imgFleetwood},
    
  ]

  const [products] = useState(initial)
  const [search, setSearch] = useState('')
  const [artistFilter, setArtistFilter] = useState('')
  const [maxPrice, setMaxPrice] = useState(1000)

  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('cart')||'[]') }catch(e){return []}
  })

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  const artists = useMemo(()=>{
    const set = new Set(products.map(p=>p.artist))
    return Array.from(set)
  },[products])

  function filtered(){
    return products.filter(p=>{
      const q = (p.title + ' ' + p.artist + ' ' + (p.description||'')).toLowerCase()
      if(search && !q.includes(search.toLowerCase())) return false
      if(artistFilter && p.artist!==artistFilter) return false
      if(p.price>maxPrice) return false
      return true
    })
  }

  function addToCart(product){
    setCart(prev=>{
      const found = prev.find(i=>i.id===product.id)
      if(found) return prev.map(i=> i.id===product.id? {...i, qty: i.qty+1}: i)
      return [{...product, qty:1}, ...prev]
    })
  }

  function removeFromCart(id){ setCart(prev=> prev.filter(i=>i.id!==id)) }
  function changeQty(id, qty){ setCart(prev=> prev.map(i=> i.id===id? {...i, qty}: i)) }

  const results = filtered()

  return (
    <div>
      <Header onOpenCart={()=>setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.qty,0)} onSearchChange={setSearch} search={search} />
      <Hero />

      <main className="container layout">
        <aside className="filters">
          <h4>Buscar y filtrar</h4>
          <label>Artista</label>
          <select value={artistFilter} onChange={e=>setArtistFilter(e.target.value)}>
            <option value="">Todos</option>
            {artists.map(a=> <option key={a} value={a}>{a}</option>)}
          </select>

          <label>Precio máximo: ${maxPrice}</label>
          <input type="range" min="0" max="2000" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} />

          <button className="btn" onClick={()=>{setArtistFilter(''); setMaxPrice(1000); setSearch('')}}>Limpiar</button>
        </aside>

        <section id="productos" className="grid">
          {results.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
          {results.length===0 && <p className="muted">No se encontraron productos.</p>}
        </section>
      </main>

      <section id="quienes" className="container about">
        <h3>Quiénes somos</h3>
        <p>Somos ViniloStore, una tienda dedicada a los amantes del vinilo. Seleccionamos ediciones cuidadas y clásicos imprescindibles. Nuestra tienda física está en La Roma, CDMX.</p>
      </section>

      <section id="mapa" className="container map-section">
        <h3>Nuestra ubicación</h3>
        <div className="map-container">
          <iframe
            title="mapa-roma-cdmx"
            src="https://www.google.com/maps?q=la+roma+cdmx&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section id="contacto" className="container contact">
        <h3>Contacto</h3>
        <p>¿Tienes una pregunta? Escríbenos y te respondemos pronto.</p>
        <form onSubmit={e=>e.preventDefault()}>
          <input placeholder="Tu nombre" />
          <input placeholder="Tu email" />
          <textarea placeholder="Mensaje" />
          <button className="btn" type="button">Enviar</button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} ViniloStore </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} cartItems={cart} onRemove={removeFromCart} onChangeQty={changeQty} />
    </div>
  )
}
