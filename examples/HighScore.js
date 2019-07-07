import StyledLog from "../src/index.js";

// example showcasing custom aliases for dynamic logs
const scoreLog = new StyledLog().html`
  High Score: <score class="score" />!
`.css`
  .score {
    color: red;
  }
`;

scoreLog.alias.score = 45;
scoreLog.log(); // High Score: 45

scoreLog.alias.score = 512;
scoreLog.log(); // High Score: 512
