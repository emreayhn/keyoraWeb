// Yalnızca /assets/media/* için çalışır: statik dosya katmanı Range isteklerine 206 dönmüyor,
// Safari (iOS/macOS) ise videoyu ancak parça parça alabilirse oynatıyor. Kayıt/izleme yok.
export default {
  async fetch(request, env) {
    const res = await env.ASSETS.fetch(request);
    if (res.status !== 200) return res;

    const range = request.headers.get("Range");
    const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    // HEAD isteğinin gövdesi boş gelir; parçalamak yerine tam yanıtı döndür.
    if (request.method !== "GET" || !m || (m[1] === "" && m[2] === "")) {
      const full = new Response(res.body, res);
      full.headers.set("Accept-Ranges", "bytes");
      return full;
    }

    const buf = await res.arrayBuffer();
    const size = buf.byteLength;
    let start, end;
    if (m[1] === "") {
      start = Math.max(0, size - Number(m[2]));
      end = size - 1;
    } else {
      start = Number(m[1]);
      end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
    }
    if (start > end || start >= size) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }

    const headers = new Headers(res.headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    return new Response(buf.slice(start, end + 1), { status: 206, headers });
  },
};
