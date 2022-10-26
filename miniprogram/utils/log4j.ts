import { formatTime } from "./util";
const isDebug = true;
const color: {
  [key in Log4jType]: string;
} = {
  debug: "color: #ff6348",
  error: "color: #ff4757",
  group: "color: #f1f2f6",
  groupEnd: "color: #f1f2f6",
  info: "color: #2ed573",
  log: "color: #fff",
  table: "color: #747d8c",
  warn: "color: #ffa502",
};
const head: {
  [key in Log4jType]: string;
} = {
  debug: "🐛[DEBUG]",
  error: "💥[ERROR]",
  group: "📦[GROUP]",
  groupEnd: "📦[GROUPEND]",
  info: "✅[INFO]",
  log: "✍[LOG]",
  table: "📃[TABLE]",
  warn: "🚧[WARN]",
};
const print: (type: Log4jType, content?: any) => void = (type, content) => {
  const time = formatTime(new Date());
  console.log(
    "%c%s %c%s",
    color[type],
    head[type],
    "color: #1e90ff",
    time,
    ...content
  );
};
class Log4j {
  private static isDebug = false;
  static debug(...content: Array<any>) {
    this.isDebug ? print("debug", content) : {};
  }
  static error(...content: Array<any>) {
    this.isDebug ? print("error", content) : {};
  }
  static group(...content: Array<any>) {
    this.isDebug ? print("group", content) : {};
  }
  static groupEnd() {
    this.isDebug ? print("groupEnd") : {};
  }
  static info(...content: Array<any>) {
    this.isDebug ? print("info", content) : {};
  }
  static log(...content: Array<any>) {
    this.isDebug ? print("log", content) : {};
  }
  static table(...content: Array<any>) {
    this.isDebug ? print("log", content) : {};
  }
  static warn(...content: Array<any>) {
    this.isDebug ? print("warn", content) : {};
  }
}
Object.defineProperty(Log4j, "isDebug", {
  writable: false,
  configurable: false,
  enumerable: false,
});
export default Log4j;
// Object.preventExtensions(Log4j)
// Object.seal(Log4j)
// Object.freeze(Log4j)
// function t(){
//   console.log(this.isDebug)
//   this.isDebug = false
//   console.log(this.isDebug)
// }
// Log4j.info(t.apply(Log4j))