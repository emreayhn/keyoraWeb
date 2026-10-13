# Keyora — tanıtım sayfası

[Keyora](https://github.com/emreayhn/keyora) için statik tanıtım sayfası (Türkçe + İngilizce).
Derleme adımı yoktur; `public/` klasörü olduğu gibi yayınlanır.

```
public/
├── index.html            Türkçe
├── en/index.html         İngilizce
├── _headers              Cloudflare Pages güvenlik başlıkları (CSP: yalnızca kendi dosyaları)
├── favicon.ico
└── assets/
    ├── style.css, main.js
    ├── noise.svg, check.svg
    ├── *.png             sahte verili deneme kasasından ekran görüntüleri
    └── media/            tanıtım videosu (keyoraVideo projesinden) + poster
.claude/skills/keyora-pazarlama/   marka, doğrulanmış iddialar ve sayfa kuralları
```

## Cloudflare Pages

- Build command: (boş)
- Build output directory: `public`

## Yerelde bakmak

```bat
python -m http.server 8000 --directory public
```

## Yeni sürümde

İki sayfadaki sürüm numarasını ve indirme bağlantılarını (`v1.2.1`, `Keyora-Setup-1.2.1.exe`) güncelle.
Metin değiştirirken `.claude/skills/keyora-pazarlama/SKILL.md`'deki doğrulanmış iddialar listesine uy.
