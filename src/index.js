import "./styles.css";
import StyledLog from "./StyledLog";

new StyledLog().html`
  This is Styled Logs!
  <br />
  this is the package of:
  <br />
  <br />
  <div class="name">styled-logs</div>
  <div class="version">v0.1.0</div>
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
  this is a 
  <spacer/><div class="cool">cool</div><spacer/>
  and
  <br>
  <spacer/><div class="stylized">stylized</div><spacer/>
  console log
  <div class="excalamation">!</div>
`.css`
  cool { color: yellow; }
  stylized { 
    background: #C06344;
    padding: 2px 4px;
    border-radius: 10px;
  }
  excalamation {
    font-size: 2em;
  }
`.log();

const platform = navigator.platform.toUpperCase();
const isMac = platform.includes("MAC");
const isLinux = platform.includes("LINUX");

let shortcut = "Ctrl + Shift + J";
if (isMac) shortcut = "Cmd + Option + J";
if (isLinux) shortcut = "Ctrl + Shift + I";
document.querySelector(".shortcut").textContent = `(${shortcut})`;
