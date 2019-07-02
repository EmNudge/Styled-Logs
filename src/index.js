import "./styles.css";
import StyledLog from "./StyledLog";

new StyledLog().html`
  This is <div class="name">styled-logs</div>
  <div class="version">v0.1.0</div>
  <br />
  <br />
  Style your <div class="name">console</div>
  <div class="version">logs</div>
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

const platform = navigator.platform.toUpperCase();
const isMac = platform.includes("MAC");
const isLinux = platform.includes("LINUX");

let shortcut = "Ctrl + Shift + J";
if (isMac) shortcut = "Cmd + Option + J";
if (isLinux) shortcut = "Ctrl + Shift + I";
document.querySelector(".shortcut").textContent = `(${shortcut})`;
