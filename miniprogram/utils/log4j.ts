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
  if (!isDebug) {
    return;
  }
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
export default class Log4j {
  static debug(...content: Array<any>) {
    print("debug", content);
  }
  static error(...content: Array<any>) {
    print("error", content);
  }
  static group(...content: Array<any>) {
    print("group", content);
  }
  static groupEnd() {
    print("groupEnd");
  }
  static info(...content: Array<any>) {
    print("info", content);
  }
  static log(...content: Array<any>) {
    print("log", content);
  }
  static table(...content: Array<any>) {
    print("log", content);
  }
  static warn(...content: Array<any>) {
    print("warn", content);
  }
}
