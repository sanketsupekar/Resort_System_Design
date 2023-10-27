import React from 'react'
import "../styles/components/test.css"
import CustomerProfileCard from '../components/CustomerProfileCard'
export default function Test() {
  return (
    <section className="app">
  <aside className="sidebar">
         <header>
        Menu
      </header>
    <nav className="sidebar-nav">
 
      <ul>
        <li>
          <a href="#"><i className="ion-bag"></i> <span>Shop</span></a>
          <ul className="nav-flyout">
             <h1>Sanket Supekar</h1>
          </ul>
        </li>
       
      </ul>
    </nav>
  </aside>
</section>
  )
}
