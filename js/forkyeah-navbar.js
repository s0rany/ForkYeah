import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ForkYeahNavbar extends LitElement {
  static get tag() {
    return 'forkyeah-navbar';
  }

  static get properties() {
    return {
      _openDropdown: { type: String,  state: true },
      _selected:     { type: Object,  state: true },
    };
  }

  constructor() {
    super();
    this._openDropdown = null;
    this._selected = {
      COUNTRY: 'All Countries',
      BOROUGH: 'All Boroughs',
      PRICE:   'Any Price',
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

  _toggleDropdown(name) {
    this._openDropdown = this._openDropdown === name ? null : name;
  }

  _selectOption(filterName, option) {
    this._selected = { ...this._selected, [filterName]: option };
    this._openDropdown = null;

    document.dispatchEvent(new CustomEvent('forkyeah-filter', {
      detail: { ...this._selected },
    }));
  }

  _isDefault(filterName) {
    const defaults = {
      COUNTRY: 'All Countries',
      BOROUGH: 'All Boroughs',
      PRICE:   'Any Price',
    };
    return this._selected[filterName] === defaults[filterName];
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
        padding: 18px 18px;
        flex-shrink: 0;
        color: #ff0000;
        cursor: pointer;
        user-select: none;
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

        position: relative;
        overflow: hidden;

        transition: color 0.2s ease;
      }

      .filter-btn.active-filter {
        background: #fff5f5;
      }

      .filter-btn::before {
        content: "";
        position: absolute;
        top: 20%;
        bottom: 20%;
        left: 0;
        right: 0;

        background: #ff0000;

        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 0;
      }

      .filter-btn:hover::before {
        opacity: 1;
      }

      .filter-btn * {
        position: relative;
        z-index: 1;
      }

      .filter-btn:hover {
        color: #ffffff;
      }

      .filter-btn:hover .chev {
        color: #ffffff;
      }

      .filter-btn .chev {
        font-size: 8px;
        color: #E8192C;
        line-height: 1;
        transition: color 0.2s ease;
      }

      .filter-val {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #E8192C;
        line-height: 1;
        margin-bottom: 2px;
        transition: color 0.2s ease;
      }

      .filter-btn:hover .filter-val {
        color: #fff;
      }

      /* ✅ NEW: label styling */
      .filter-label {
        position: relative;
        z-index: 1;
        transition: color 0.2s ease;
      }

      .filter-btn:hover .filter-label {
        color: #ffffff;
      }

      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 160px;
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
        padding: 9px 14px;
        cursor: pointer;
        color: #111;
        transition: background 0.12s, color 0.12s;
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

      @media (max-width: 600px) {
        nav {
          border-bottom-width: 5px;
        }

        .brand-right {
          display: none;
        }

        .brand {
          font-size: 24px;
          padding: 12px 10px;
          line-height: 1;
        }

        .filter-btn {
          font-size: 14px;
          letter-spacing: 0.05em;
          padding: 8px 6px;
        }

        .filter-val {
          font-size: 8px;
        }

        .filter-btn .chev {
          font-size: 7px;
        }
      }
    `;
  }

  _options() {
    return {
      COUNTRY: ['All Countries', 'American', 'Chinese', 'Italian', 'Japanese', 'Mexican', 'Indian', 'Thai'],
      BOROUGH: ['All Boroughs', 'Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'],
      PRICE:   ['Any Price', '$ Inexpensive', '$$ Moderate', '$$$ Expensive', '$$$$ Very Expensive'],
    };
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
                class="filter-btn ${!this._isDefault(name) ? 'active-filter' : ''}"
                @click="${() => this._toggleDropdown(name)}"
              >
                <span class="filter-label">${name}</span>
                ${!this._isDefault(name) ? html`
                  <span class="filter-val">${this._selected[name]}</span>
                ` : ''}
                <span class="chev">▼</span>
              </button>
              <div class="dropdown ${this._openDropdown === name ? 'open' : ''}">
                ${opts[name].map(opt => html`
                  <div
                    class="dropdown-item ${this._selected[name] === opt ? 'selected' : ''}"
                    @click="${() => this._selectOption(name, opt)}"
                  >${opt}</div>
                `)}
              </div>
            </div>
          `)}
        </div>

        <div class="vsep"></div>

        <div class="brand brand-right" style="text-align:right">FORK<br>YEAH!</div>
      </nav>
    `;
  }
}

customElements.define(ForkYeahNavbar.tag, ForkYeahNavbar);