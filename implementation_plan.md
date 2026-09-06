# Play Store Uyumlu Lüks Satranç Oyunu (React Native & Expo)

Bu plan; çevrimdışı yapay zekaya (AI) sahip, `stitch-mind` içerisindeki modern koyu/altın (Obsidian & Burnished Brass) tasarım dilini taşıyan, Play Store gereksinimlerine tam uyumlu ve gelecekte kolayca online çok oyunculu (multiplayer) moda genişletilebilecek bir satranç oyunu mimarisini kurmayı amaçlar.

---

## Kullanıcı İncelemesi ve Onayı Gereken Konular

> [!IMPORTANT]
> **Mimari Karar:** 
> - **Framework:** React Native + Expo (TypeScript).
> - **Satranç Kural Motoru:** `chess.js` (FIDE kuralları: Rok, geçerken alma, piyon terfisi, 50 hamle kuralı, üç konum tekrarı, mat/pat).
> - **Yapay Zeka (AI):** Cihazda yerel çalışan, internetsiz (çevrimdışı) Alpha-Beta Pruning + Minimax motoru. 3 kademeli zorluk:
>   - *Acemi / Çaylak (800 Elo)*: Hızlı, ara sıra hatalar yapabilen.
>   - *Kulüp Oyuncusu (1400 Elo)*: Taş değerleri ve kare kontrolü odaklı.
>   - *Usta (1800+ Elo)*: Pozisyonel değerlendirme, şah güvenliği, merkez hakimiyeti.
> - **Gelecekte Online Desteği:** `PlayerController` soyutlama katmanı sayesinde oyun tahtası koduna dokunmadan `LocalAIPlayer` yanına `OnlinePlayer` (Firebase/WebSocket) eklenebilecek şekilde modüler hazırlanacaktır.

---

## Planlanan Özellikler ve Arayüz Bileşenleri

1. **Aktif Oyun Arenası (Klasik Satranç):**
   - `stitch-mind/tahta_ui_klasik_satran_arenas` tasarımındaki obsidian & pirinç altın lüks teması.
   - 8x8 etkileşimli satranç tahtası: Dokunarak veya sürükleyerek oynama, legal hamle noktaları, son hamle vurgusu, şah durumu uyarısı.
   - Piyon terfisi (Promotion) seçim modalı (Vezir, Kale, Fil, At).
2. **Yapay Zeka Rakip Paneli (AI Dossier):**
   - Bot avatarı, isim ve Elo seviyesi, alınan taşlar (captured pieces), geri sayım saati.
3. **Oyuncu HUD Paneli:**
   - Oyuncu avatarı, Elo puanı, hamle sırası bildirimi, aktif süre sayacı.
4. **Eylem ve Yardım Butonları:**
   - **Geri Al (Undo):** Son hamleyi ve botun hamlesini geri alma.
   - **İpucu (Hint):** Yapay zeka motorundan o anki en iyi hamle önerisini alıp tahtada ışıldatma.
   - **Ayarlar (Settings):** Zorluk seviyesi, tahta yönü (Beyaz/Siyah), ses/haptic aç-kapa.
   - **Pes Et (Resign):** Maçı sonlandırma.
   - **Yeni Oyun (New Game):** Tahtayı sıfırlama.
5. **Maç Sonu Kartları & Modalları:**
   - Zafer (Kupa, Elo artışı, tebrik mesajı).
   - Yenilgi (Tekrar dene, hamle analizi).
   - Beraberlik (Pat veya yetersiz materyal).
6. **Play Store Hazırlığı:**
   - `app.json` yapılandırması (Android package: `com.chess.grandmaster`, adaptive-icon, orientations, permissions).
   - Web üzerinde anında test edilebilirlik (`npm run web` / `npx expo start --web`) ve mobilde Expo Go / APK testi.

---

## Değişiklikler ve Dosya Yapısı

```
/
├── package.json                       # Proje bağımlılıkları (expo, react-native, chess.js, lucide/vector-icons)
├── app.json                           # Play Store & Expo konfigürasyonu
├── tsconfig.json                      # TypeScript konfigürasyonu
├── App.tsx                            # Ana uygulama giriş noktası ve navigasyon kabuğu
├── src/
│   ├── types/
│   │   └── chess.ts                   # Oyun tipleri, zorluk seviyeleri, hamle arayüzleri
│   ├── logic/
│   │   ├── chessEngine.ts             # chess.js sarmalayıcı (kurallar, durumlar, FEN)
│   │   └── chessAI.ts                 # Minimax + Alpha-Beta Pruning yapay zeka motoru
│   ├── theme/
│   │   └── colors.ts                  # stitch-mind tasarımından çıkarılan altın/obsidian renk paleti
│   ├── components/
│   │   ├── ChessBoard.tsx             # 8x8 İnteraktif tahta ve taşlar
│   │   ├── ChessSquare.tsx            # Kare renderı, koordinatlar, vurgulamalar
│   │   ├── ChessPiece.tsx             # Vektörel lüks satranç taşları
│   │   ├── OpponentHeader.tsx         # AI rakip bilgi kartı, alınan taşlar, saat
│   │   ├── PlayerHUD.tsx              # Oyuncu paneli, hamle göstergesi, saat
│   │   ├── ActionControls.tsx         # Geri al, İpucu, Ayarlar, Pes et butonları
│   │   ├── StageBanner.tsx            # Meydan okuma & aşama bilgisi
│   │   ├── PromotionModal.tsx         # Piyon vezir/kale/fil/at terfi modalı
│   │   ├── GameOverModal.tsx          # Zafer / Yenilgi / Beraberlik sonuç ekranı
│   │   └── SettingsModal.tsx          # Zorluk seçimi ve tercihler
│   └── assets/                        # İkonlar ve ses efektleri (opsiyonel)
```

---

## Doğrulama ve Test Planı

### 1. Oyun Kuralları ve Mantık Doğrulaması
- Başlangıç konumu ve tüm yasal hamleler (piyon 2 kare, at L, fil çapraz, kale düz, vezir serbest).
- Özel kurallar: Şah kanadı / vezir kanadı rokü, geçerken alma (en passant), piyon son sıraya ulaştığında terfi modalı.
- Şah çekme durumunda şah karesinin kızarması, sadece şahı kurtaran hamlelerin oynanabilmesi.
- Mat (Checkmate) ve Pat (Stalemate) durumlarının otomatik algılanması.

### 2. Yapay Zeka Doğrulaması
- Beyaz hamlesinden sonra siyah yapay zekanın sırasını alması ve otomatik yasal hamle üretmesi.
- Zorluk seviyeleri (Acemi, Orta, Usta) arasında hamle derinliği ve tepki hızı farkı.
- İpucu butonuna tıklandığında motorun en avantajlı hamleyi hesaplayıp tahtada vurgulaması.

### 3. Kullanıcı Arayüzü ve Duyarlılık Doğrulaması
- Web tarayıcısında (`npx expo start --web`) ve mobil görünümde taşların tam ortalanması, estetik oranlar, dokunma tepkileri.
- Geri alma (Undo) fonksiyonunun hem oyuncunun hem AI'nın son hamlesini senkronize geri alması.
- Maç bittiğinde doğru modalın (Zafer/Yenilgi/Beraberlik) açılması ve "Tekrar Oyna" ile tahtanın sıfırlanması.

---

> [!NOTE]
> Bu plan onaylandıktan sonra projeyi Expo TypeScript şablonuyla kurup adım adım `stitch-mind` tasarımlarını yaşayan, oynanabilir bir satranç oyununa dönüştüreceğim.
