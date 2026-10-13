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

## 2. Görsel dil (tanıtım videosundan — `keyoraVideo/src/Keyora/constants.ts`)

| Token | Renk | Kullanım |
|---|---|---|
| bg | `#15101e` | sayfa zemini (yalnızca koyu tema — bilinçli karar) |
| bgSoft | `#1f1730` | bant / bölüm zemini |
| card | `#2a1f3d` | kartlar |
| cardBorder | `#3a2c52` | kenarlıklar |
| accent | `#f0a5bc` | vurgu, birincil düğme zemini (üstünde koyu metin) |
| accentDeep | `#d87aa0` | hover, degrade ucu |
| accentSoft | `#ffd3df` | parıltı, ince vurgu |
| text / textMuted / textDim | `#f7eef2` / `#b9a8c2` / `#7c6c8f` | metin hiyerarşisi (textDim yalnızca süs; okunacak metinde kullanma) |
| success | `#a5e8c4` | "0 bayt dışarı" gibi olumlu durumlar |

- **Tipografi:** Uygulama yalnızca Windows'ta çalıştığı için Windows'un kendi fontları kullanılır;
  dışarıdan font indirilmez. Başlık: `Sitka Display` (yedek: Georgia, serif) — vurgulu kelime italik +
  accent degrade. Gövde: `Segoe UI Variable Text`, `Segoe UI`. Teknik etiketler: `Cascadia Mono`, `Consolas`.
- **Atmosfer:** koyu mürdüm zemin, pembe radyal parıltılar, ince tanecik (grain, `assets/noise.svg`),
  cam (glass) kartlar. Tek, iyi kurgulanmış yükleme animasyonu + kaydırınca beliren bölümler;
  `prefers-reduced-motion` açıksa animasyon ve otomatik video oynatma kapanır.

## 3. Doğrulanmış iddialar (yalnızca bunları kullan)

Her iddia `C:\gitHub\keyora` kodunda doğrulandı (sürüm 1.2.0). Yeni iddia eklemeden önce koda bak.

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

1. **Hero** — slogan, tek cümlelik vaat, İndir (birincil) + GitHub (ikincil), güven şeridi, video.
2. **Sorun** — "Şirket kapanırsa? Sunucu ihlal edilirse? Hesabınız silinirse?" → cevap.
3. **Ürün** — gerçek ekran görüntüsü + numaralı açıklamalar.
4. **Özellikler** — bento ızgara, en güçlü 3 özellik büyük kartta.
5. **Güvenlik** — anahtar türetme şeması (master password → 2× Argon2id → doğrulama / Fernet anahtarı).
6. **Sağlık + İçe aktarma** — itiraz kırıcı: "geçiş zor olur" korkusunu gider.
7. **İndir** bandı — tekrar CTA.
8. **SSS** — itirazlar: veri nerede, bulut yok mu, SmartScreen uyarısı, kaldırınca ne olur, 2FA.

## 5. Kurallar

- **TR ve EN birebir aynı içerikte** olur; birini değiştirirsen diğerini de değiştir.
- **İzleme yok:** analitik, çerez, dış font, CDN, dış betik yok. `_headers` CSP'si yalnızca `'self'`
  izin verir; satır içi `style=""` ve `<script>` blokları çalışmaz — sınıf ve `assets/*.js` kullan.
- Ekran görüntüleri yalnızca **sahte verili deneme kasasından** alınır (ada.lovelace@example.com gibi);
  gerçek kasa asla.
- Yeni sürümde: iki sayfadaki sürüm numarası ve indirme bağlantıları (`releases/download/vX.Y.Z/...`).
- Okunabilirlik: gövde metni kontrastı ≥ 4.5:1; düğme metni ≥ 4.5:1.
- Teslimden önce: masaüstü (1280) ve telefon (375) genişliğinde ekran görüntüsü alıp bak.
