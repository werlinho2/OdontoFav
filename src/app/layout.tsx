import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "OdontoFav | Dentista na Serra e Vitória - Implante, Estética e Ortodontia",
  description: "Clínicas OdontoFav em Serra e Vitória/ES. Sob a responsabilidade técnica da Dra. Rogéria Lima Becalli, oferecemos implantes, alinhadores invisíveis, clareamento e estética do sorriso.",
  keywords: ["dentista na serra", "dentista em vitória", "clínica odontológica serra es", "odontofav", "lentes em resina", "implante dentário vitória", "clareamento dental", "alinhadores invisíveis", "aparelho ortodôntico", "dra rogéria lima becalli", "estética do sorriso"],
  authors: [{ name: "Dra. Rogéria Lima Becalli", url: "https://www.instagram.com/favodonto/" }],
  creator: "OdontoFav",
  publisher: "OdontoFav",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://odontofav.com.br",
    title: "OdontoFav | Clínica Odontológica em Serra e Vitória - ES",
    description: "Seu sorriso de volta com a máxima tecnologia e conforto. Conheça nossos tratamentos de Estética, Implantes e Alinhadores Invisíveis.",
    siteName: "OdontoFav",
    images: [{
      url: "/logo.png",
      width: 800,
      height: 800,
      alt: "OdontoFav Logo"
    }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://odontofav.com.br"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager - Global Site Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_GA4_AQUI"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SEU_ID_GA4_AQUI');
            gtag('config', 'AW-SEU_CONVERSION_ID_AQUI');
          `}
        </Script>

        {/* Meta Pixel (Facebook Pixel) */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'SEU_ID_DO_PIXEL_AQUI');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
