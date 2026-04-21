import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


export class ForkYeahNavbar extends LitElement {
 static get tag() {
   return 'forkyeah-navbar';
 }


 static get properties() {
   return {
     _openDropdown: { type: String, state: true },
     _selected: { type: Object, state: true },
   };
 }


 constructor() {
   super();
   this._openDropdown = null;
   this._selected = {
     COUNTRY: 'All Countries',
     BOROUGH: 'All Boroughs',
     PRICE: 'Any Price',
   };


   this._onOutsideClick = (e) => {
     if (!this.renderRoot.contains(e.target)) {
       this._openDropdown = null;
     }
   };
 }


 connectedCallback() {
   super.connectedCallback();
   document.addEventListener('click', this._onOutsideClick);
 }


 disconnectedCallback() {
   super.disconnectedCallback();
   document.removeEventListener('click', this._onOutsideClick);
 }


 _toggleDropdown(name, e) {
   e.stopPropagation();
   this._openDropdown = this._openDropdown === name ? null : name;
 }


 _selectOption(filterName, option, e) {
   e.stopPropagation();


   const nextSelected = { ...this._selected, [filterName]: option };
   this._selected = nextSelected;
   this._openDropdown = null;


   document.dispatchEvent(new CustomEvent('forkyeah-filter', {
     detail: nextSelected,
     bubbles: true,
     composed: true,
   }));
 }


 _isDefault(filterName) {
   const defaults = {
     COUNTRY: 'All Countries',
     BOROUGH: 'All Boroughs',
     PRICE: 'Any Price',
   };
   return this._selected[filterName] === defaults[filterName];
 }


 _options() {
   return {
     COUNTRY: ['All Countries', 'American', 'Chinese', 'Italian', 'Japanese', 'Mexican', 'Indian', 'Thai'],
     BOROUGH: ['All Boroughs', 'Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'],
     PRICE: ['Any Price', '$', '$$', '$$$', '$$$$'],
   };
 }


 static get styles() {
   return css`
     :host {
       display: block;
       width: 100%;
       font-family: 'Barlow Condensed', sans-serif;
     }


     nav {
       display: flex;
       align-items: stretch;
       border-bottom: 10px solid #ff0019;
       background: #fff;
     }


     .brand {
       font-weight: 600;
       font-size: 36px;
       letter-spacing: 0.06em;
       line-height: 1;
       text-transform: uppercase;
       padding: 18px;
       flex-shrink: 0;
       color: #ff0000;
     }


     .vsep {
       position: relative;
       width: 4px;
     }


     .vsep::before {
       content: "";
       position: absolute;
       top: 20%;
       bottom: 20%;
       left: 0;
       border-left: 1px solid #ff0000;
     }


     .filters {
       display: flex;
       flex: 1;
       align-items: stretch;
     }


     .filter-wrap {
       position: relative;
       display: flex;
       flex: 1;
     }


     .filter-wrap::after {
       content: "";
       position: absolute;
       right: 0;
       top: 20%;
       bottom: 20%;
       border-right: 1px solid #ff0000;
     }


     .filter-wrap:last-child::after {
       display: none;
     }


     .filter-btn {
       flex: 1;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       padding: 10px 16px;
       cursor: pointer;
       background: none;
       border: none;
       font-family: 'Barlow Condensed', sans-serif;
       font-weight: 600;
       font-size: 22px;
       letter-spacing: 0.1em;
       text-transform: uppercase;
       color: #ff0000;
     }


     .filter-val {
       font-size: 10px;
       font-weight: 700;
       letter-spacing: 0.08em;
       text-transform: uppercase;
       color: #E8192C;
       line-height: 1;
       margin-bottom: 2px;
     }


     .chev {
       font-size: 8px;
       color: #E8192C;
     }


     .dropdown {
       display: none;
       position: absolute;
       top: 100%;
       left: 0;
       right: 0;
       background: #fff;
       border: 2px solid #E8192C;
       border-top: none;
       z-index: 100;
       flex-direction: column;
     }


     .dropdown.open {
       display: flex;
     }


     .dropdown-item {
       font-family: 'Barlow Condensed', sans-serif;
       font-weight: 700;
       font-size: 12px;
       letter-spacing: 0.1em;
       text-transform: uppercase;
       padding: 10px 14px;
       cursor: pointer;
       color: #111;
       border-bottom: 1px solid #f0f0f0;
     }


     .dropdown-item:last-child {
       border-bottom: none;
     }


     .dropdown-item:hover,
     .dropdown-item.selected {
       background: #E8192C;
       color: #fff;
     }
   `;
 }


 render() {
   const opts = this._options();


   return html`
     <nav>
       <div class="brand">FORK<br>YEAH!</div>
       <div class="vsep"></div>


       <div class="filters">
         ${['COUNTRY', 'BOROUGH', 'PRICE'].map(name => html`
           <div class="filter-wrap">
             <button
               class="filter-btn"
               @click=${(e) => this._toggleDropdown(name, e)}
             >
               ${!this._isDefault(name) ? html`
                 <span class="filter-val">${this._selected[name]}</span>
               ` : null}
               <span>${name}</span>
               <span class="chev">▼</span>
             </button>


             <div class="dropdown ${this._openDropdown === name ? 'open' : ''}">
               ${opts[name].map(opt => html`
                 <div
                   class="dropdown-item ${this._selected[name] === opt ? 'selected' : ''}"
                   @click=${(e) => this._selectOption(name, opt, e)}
                 >
                   ${opt}
                 </div>
               `)}
             </div>
           </div>
         `)}
       </div>


       <div class="vsep"></div>
       <div class="brand">FORK<br>YEAH!</div>
     </nav>
   `;
 }
}


customElements.define(ForkYeahNavbar.tag, ForkYeahNavbar);

