import "./styles/sass/app.sass";
import logoIrasi from "/logo_irasi.png"
import cartIcon from "/cart_icon.svg"

function App() {

  return (
    <>
              <header className="header">
        <div className="header_left">
          <a className="logo" href="index.html">
            <img className="logo_irasi" src={logoIrasi} alt="" />
          </a>

          <nav className="header_nav">
            <a className="header_shop" href="#">Tienda</a>
            <a className="header_about" href="#">Sobre nosotros</a>
            <a className="header_contact" href="#">Contacto</a>
          </nav>
        </div>

        <div className="header_right">
          <div className="cart_button">
          <img className="cart_icon" src={cartIcon} alt="" />
          </div>
        </div>
      </header>

      
      <section className="hero_section">

      </section>
    </>
  )
}

export default App
