export function generateCsv<T>(data: T[]) {
  let str = "";
  const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);

  for (const obj of data) {
    let line = "";
    for (const index in obj) {
      if (line !== "") line += ";";

      line += obj[index];
    }
    str += line + "\r\n";
  }
  return new Blob([BOM, str], { type: "text/csv;charset=utf-8;" });
}
