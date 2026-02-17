export function generateCsv<T>(data: T[]) {
  let str = "";

  for (const obj of data) {
    let line = "";
    for (const index in obj) {
      if (line !== "") line += ";";

      line += obj[index];
    }
    str += line + "\r\n";
  }
  return new Blob([str], { type: "text/csv" });
}
