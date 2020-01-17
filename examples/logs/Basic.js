import StyledLog from "../../build/StyledLogs.min.js";

new StyledLog().html`
  This is a <div class="styled">styled console log</div>
`.css`
  .styled {
    color: #6182C1;
  }
`.log();
