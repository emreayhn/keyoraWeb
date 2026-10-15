---
name: keyora-pazarlama
description: Keyora tanıtım sayfasını (keyora-web) tasarlarken, metin yazarken veya güncellerken kullan — marka dili, renkler, tipografi, doğrulanmış iddialar listesi, TR/EN eşliği ve gizlilik kuralları. Yeni sürüm çıktığında, yeni bölüm eklerken, pazarlama metni yazarken.
---

# Keyora pazarlama ve tanıtım sayfası yönergesi

Keyora, tamamen çevrimdışı çalışan, ücretsiz ve açık kaynak bir Windows parola yöneticisidir.
Sayfanın tek işi: ziyaretçiyi **"şifrelerim neden bir şirketin sunucusunda?"** sorusundan
**İndir** düğmesine götürmek.

## 1. Marka

- **Slogan:** "Şifreleriniz, sadece sizin." / "Your passwords. Only yours." (tanıtım videosuyla aynı)
- **Ses tonu:** sakin, kendinden emin, abartısız. Korku satma; gerçek riskleri (sunucu ihlali,
  şirketin kapanması, hesabın silinmesi) bir kez, net söyle, sonra çözümü göster.
- **Kişilik:** küçük, dürüst, kontrol kullanıcıda. "Biz" yerine ürünü ve kullanıcıyı öne çıkar.
- **Yasak kelimeler:** "kırılamaz", "%100 güvenli", "askeri düzey", "hacklenemez", "en iyi".

## 2. Görsel dil

İki ayrı yüzey var; ikisi de uygulamanın kendi iki temasından türer.

**Tanıtım sayfası (2026-10 yeniden tasarım):** açık zemin = dünya, koyu panel = kasa.
Sayfa açık temada; adres çubuğu, ekran görüntüsü penceresi ve Güvenlik bölümü koyu (kasa).

| Token | Renk | Kullanım |
|---|---|---|
| paper / paper-2 | `#f3edf0` / `#e9e0e5` | sayfa ve bant zemini (uygulamanın açık temasındaki pembe panelden) |
| line | `#d8ccd2` | ince çizgiler |
| ink / ink-soft | `#2a2335` / `#5d5469` | metin; birincil düğme zemini ink |
| rose | `#a84a62` | açık zeminde vurgu (risk soruları, odak çerçevesi) |
| vault / vault-2 / vault-line | `#1f1d2e` / `#2b2842` / `#3e3b58` | koyu kasa panelleri (uygulamanın koyu teması) |
| vault-text / vault-muted | `#ece8f0` / `#a7a0b5` | koyu panel metni |
| petal / mint | `#e8a0b5` / `#a8d8b9` | yalnızca koyu panelde vurgu (`keyora.db`, anahtar) ve olumlu durum |

- **Tek gösterişli an:** hero'da "Şifreleriniz nerede?" sorusunun cevabı bir Windows dosya yolu
  (`C:\Users\siz\AppData\Local\Keyora\keyora.db`) olarak harf harf yazılır. Başka giriş animasyonu ekleme;
  kaydırınca beliren bölümler, parıltılar, cam kartlar, bento ızgara bilerek yok.
- **Kaçınılanlar:** başlıkta tek kelimeyi italik/renkli vurgulamak, büyük harfli üst etiketler (eyebrow),
  "A · B · C" ara noktalı meta satırları, bağlantı sonuna "→", mac pencere noktaları (uygulama Windows'ta:
  pencere denetimleri sağda). Numara yalnızca gerçekten sıralı içerikte (Nasıl çalışır adımları).
- **Tipografi:** Fontlar sitede barındırılır (`assets/fonts/`, woff2, latin + latin-ext alt kümeleri,
  OFL lisansları yanında; CSP `font-src 'self'`). Google Fonts'a ya da başka CDN'e bağlantı verilmez.
  Başlık: `Fraunces` (opsz yüksek, 600, sıkı aralık). Gövde: `Instrument Sans` (400–700).
  Dosya yolu ve kod: `Cascadia Mono` (Windows Terminal'in fontu; yalnızca yol/kod için, etiket süsü olarak değil).
  Inter, Roboto, Arial, Space Grotesk kullanma. Yeni font eklerken Türkçe karakterleri (ş ğ ı İ ç ö ü) kontrol et;
  `text-transform: uppercase` kullanırsan "Argon2id" gibi İngilizce terimleri `lang="en"` ile sar (yoksa "ARGON2İD" olur).
- **Ekran görüntüleri:** `assets/screens/*.webp`, 2× çözünürlükte, sahte verili deneme kasasından
  (`keyoraVideo/keyora-tur/tools/demo_shots.py` gerçek kasaya dokunmaz).
- `prefers-reduced-motion` açıksa yazma animasyonu ve otomatik video oynatma kapanır.

**Tanıtım videosu (`keyoraVideo/keyora-tur`, HyperFrames):** koyu mürdüm zemin `#15101e`, kart `#2a1f3d`,
vurgu `#f0a5bc`, başarı `#a5e8c4`; aynı üç font. 9:16 ve 1:1 (`keyora-tur-1x1`) sürümleri var.

## 3. Doğrulanmış iddialar (yalnızca bunları kullan)

Her iddia `C:\gitHub\keyora` kodunda doğrulandı (sürüm 1.2.1). Yeni iddia eklemeden önce koda bak.

- İnternete hiç bağlanmaz: güncelleme denetimi, istatistik, hata raporu yok.
- Kayıtların **içeriği** şifreli (şifre, uygulama adı, kullanıcı adı, notlar, kategori adları).
  ⚠ "Dosyanın tamamı şifreli / dosya açılamaz" DEME: SQLite dosyası açılabilir; kayıt sayısı,
  tarihler, favori bayrağı okunabilir. Doğru ifade: "içerik master password olmadan okunamaz".
- Argon2id: iki ayrı çağrı, iki ayrı rastgele tuz (doğrulama + anahtar), 64 MB bellek, 3 tur.
- Fernet = AES-128-CBC + HMAC-SHA256. "Keyora anahtarı diske yazmaz" (bellek sayfa dosyasına
  düşebilir; "anahtar asla diske değmez" DEME).
- Pano 20 sn'de temizlenir; Win+V geçmişine ve bulut panosuna düşmez.
- Windows kilitlenince (Win+L), uykuda, uzak masaüstü kopunca kasa kilitlenir; boşta kalınca otomatik kilit.
- Ekran yakalamadan gizli — varsayılan açık; Windows 10 2004 öncesinde pencere siyah görünür.
- Yedek: kasa açılırken günde bir kez + değişiklik varsa kilitlerken/kapatırken; varsayılan son 10.
- Şifre geçmişi: son 5. Şifre üretici: uzunluk + karakter türleri, `secrets`.
- Şifre Sağlığı: zayıf (kısa ya da az karakter türü), tekrar kullanılan, 1 yıldır değişmeyen.
- İçe aktarma: Chrome/Edge/Brave, Firefox, Bitwarden, KeePassXC, KeePass 2, LastPass, Keyora CSV;
  önizleme, aynı kayıtları atlama, öncesinde yedek. 2FA (TOTP) bilerek aktarılmaz.
- Yanlış şifre: 3 denemeden sonra artan bekleme (en fazla 5 dk), yeniden başlatmak sıfırlamaz.
- Listede şifre maskeli, göz simgesiyle 10 sn görünür ("her zaman maskeli" DEME: düzenleme
  penceresi ve üretici şifreyi açık gösterebilir). Kopyalanan kullanıcı adı ve şifre 20 sn'de silinir.
- 1.0.0'dan geçişte alınan yedek meta veriyi düz metin içerir; kullanıcıya silmesi önerilir.
- Kasa: `%LOCALAPPDATA%\Keyora\keyora.db`. Kaldırma kasayı silmez. Master password unutulursa kurtarma yok.
- Gereksinim: Windows 10 (1809) / 11, 64-bit. Kurulum yönetici izni istemez. MIT lisansı.
- Arayüz yalnızca Türkçe — İngilizce sayfada bunu belirt.

## 4. Sayfa yapısı (dönüşüm sırası)

1. **Hero** — "Şifreleriniz nerede?" + cevap olarak dosya yolu, İndir (birincil) + GitHub (metin bağlantısı), 1:1 video.
2. **Nasıl çalışır** — 6 adım; geniş ekranda sağda sabit uygulama penceresi adıma göre ekran değiştirir.
3. **Ayrıntılar** — tanım listesi (ekran paylaşımı, yedek, geçmiş, üretici, tema, kısayollar).
4. **Güvenlik** (koyu kasa bölümü) — anahtar türetme ağacı, ne şifreli, deneme koruması, açık kaynak, kurtarma yok uyarısı.
5. **İndir** — tekrar CTA.
6. **SSS** — veri nerede, bulut yok mu, SmartScreen uyarısı, kaldırınca ne olur, 1.0.0 geçişi, 2FA, ücret/veri.

## 5. Kurallar

- **TR ve EN birebir aynı içerikte** olur; birini değiştirirsen diğerini de değiştir.
- **İzleme yok:** analitik, çerez, dış font, CDN, dış betik yok. `_headers` CSP'si yalnızca `'self'`
  izin verir; satır içi `style=""` ve `<script>` blokları çalışmaz — sınıf ve `assets/*.js` kullan.
- Ekran görüntüleri yalnızca **sahte verili deneme kasasından** alınır (ada.lovelace@example.com gibi);
  gerçek kasa asla.
- Yeni sürümde: iki sayfadaki sürüm numarası ve indirme bağlantıları (`releases/download/vX.Y.Z/...`).
- Okunabilirlik: gövde metni kontrastı ≥ 4.5:1; düğme metni ≥ 4.5:1.
- Teslimden önce: masaüstü (1440) ve telefon (375) genişliğinde ekran görüntüsü alıp bak.
