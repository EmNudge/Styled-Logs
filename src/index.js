import "./styles.css";
import StyledLog from "./StyledLog";

new StyledLog().html`
  hello my
  <spacer/><div class="adj">good</div><spacer/>
  <br>
  and
  <div class="my-adj">special</div>
  friend!
`.css`
  adj { color: yellow; }
  my-adj { background: yellow; }
`.log();
