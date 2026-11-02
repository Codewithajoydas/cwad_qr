# CWAD QR mobile

The Expo mobile app brings the QR generator and scanner to iOS and Android with native navigation and device integrations.

## Features

- Generate QR codes for links, contacts, Wi-Fi, email, phone, SMS, text, PDFs, images, locations, Bitcoin payments, and events.
- Preview QR codes as you edit, choose a color preset, copy the encoded content, save a PNG to Photos, or share the image.
- Scan QR codes with the device camera, switch cameras, use the torch, copy results, and open supported links.
- Review, search, filter, copy, and delete locally saved generated codes and scans.
- Toggle dark mode; preferences and history persist on the device.
- Four bottom tabs keep Create, Scan, History, and Settings within easy reach.

Generated content and history stay on the device. Camera and photo-library permissions are requested only when the related feature is used.

## Run the app

From the repository root:

```bash
npm install
npm run --workspace=mobile start
```

Open the Expo development build on an Android emulator or iOS simulator, or use:

```bash
npm run --workspace=mobile android
npm run --workspace=mobile ios
```

Camera scanning and saving QR images to the photo library require a native iOS or Android build.
