import StyledLog from "../src/index.js";

new StyledLog().html`
  This is
  <div class="name">styled-logs</div><div class="version">v0.1.0</div>
  <br />
  <br />
  Style your <div class="name">console</div><div class="version">logs</div>
  <br />
  in a familiar way!
`.css`
  .name { 
    color: white;
    background: linear-gradient(#555, #333);
    padding: 2px 6px;
    border-radius: 4px 0 0 4px;
  }
  .version {
    color: white;
    background: linear-gradient(#E86, #C64);
    padding: 2px 6px;
    border-radius: 0 4px 4px 0;
  }
`.log();
