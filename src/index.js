import "./styles.css";
import StyledLog from "./StyledLog";

new StyledLog().html`
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
