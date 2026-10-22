# Akran Nezaketi

Umut, Derya ve Nida’nın hikâyesini anlatan Türkçe, mobil uyumlu web platformu. Dört bölüm içerir: kahramanlar, hikâye, dört sahnelik sunum ve film bağlantısı.

## Dosya yapısı

```text
akran-nezaketi-web/
├── index.html        # Sayfalar ve içerikler
├── styles.css        # Masaüstü ve mobil tasarım
├── app.js            # Bölüm geçişleri ve sahne sunumu
├── config.js         # Değiştirilecek video bağlantısı
├── assets/
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   └── 4.png
└── README.md
```

Kurulum veya derleme gerekmez. `index.html` dosyasını tarayıcıda açarak kullanabilirsiniz. Yazı tipleri internet üzerinden Google Fonts’tan yüklenir; çevrimdışıyken sistem yazı tipi kullanılır. Sayfalar ve görseller çevrimdışıyken de çalışır.

## Video bağlantısını ekleme

`config.js` içindeki `videoUrl` değerine paylaşılabilir tam video bağlantısını yazın:

```js
window.SITE_CONFIG = {
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_KIMLIGI"
};
```

YouTube, Vimeo, Google Drive veya doğrudan video dosyası bağlantısı kullanılabilir. Bağlantı yeni sekmede açılır. Google Drive gibi servislerde görüntüleme iznini izleyicilerin erişebileceği şekilde ayarlayın. Bağlantı boşken film bölümünde “Film yakında burada” mesajı gösterilir; çalışmayan bir izleme düğmesi gösterilmez.

## GitHub Pages ile yayımlama

1. GitHub’da yeni bir depo oluşturun.
2. **Bu klasörün içindeki** dosyaları ve `assets` klasörünü deponun ana dizinine yükleyin. `index.html` doğrudan depo kökünde olmalı.
3. Depoda **Settings → Pages** bölümünü açın.
4. **Source → Deploy from a branch**, dal olarak **main**, klasör olarak **/ (root)** seçin ve kaydedin.
5. Yayımlama tamamlandığında GitHub’ın gösterdiği site bağlantısını açın.

Tüm dosya yolları göreli olduğu için proje depolarının alt adreslerinde de çalışır. Sunucu, API anahtarı veya ek paket gerekmez. Daha sonra `config.js` dosyasını güncelleyip GitHub’a yüklemek video bağlantısını değiştirmek için yeterlidir.

## Sunum kullanımı

- Üst menüden dört bölüm arasında geçiş yapın.
- Sahnelerde ok düğmeleri, dört sahne noktası veya klavyenin sağ ve sol oklarını kullanın.
- Otomatik gösterim her 8 saniyede bir sahneyi değiştirir ve döngüde devam eder. Düğmeye yeniden basarak durdurun. Bölümden ayrılınca veya sekme gizlenince otomatik gösterim durur.
- Sağ alt köşedeki tam ekran düğmesi sahne sunumunu büyütür. Esc ile çıkabilirsiniz.

## İçerik

Özgün hikâye, MEB Ortaöğretim Akran Nezaketi Etkinlik Kitabı’ndaki saygı, adalet, yardımseverlik ve nezaketin yayılması temalarından esinlenir. Fotoğraflar bu proje için yapay zekâ ile üretilmiştir. Kullanılan kişiler kurgu karakterlerdir.
