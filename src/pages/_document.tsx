/* eslint-disable @next/next/no-img-element */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";


// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16843608762">
// </script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'AW-16843608762');
// </script>
export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="theme-color"
          content="#FFF3E4"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#FFF3E4"
          media="(prefers-color-scheme: dark)"
        />
        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <link rel="canonical" href="https://virtupace.com" />
        <meta property="og:site_name" content="virtupace" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
        <script
          defer
          data-domain="virtupace.com"
          src="https://traffic.offertrack.xyz/js/script.js"
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "otxa029bt6");
        `,
          }}
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        gtag('event', 'conversion', {'send_to': 'AW-16819307170/LJ4RCN7Ch4saEKKFidQ-'});
        `,
          }}>
        </script>

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
    adroll_adv_id = " ";
    adroll_pix_id = "";
    adroll_version = "2.0";

    (function(w, d, e, o, a) {
        w.__adroll_loaded = true;
        w.adroll = w.adroll || [];
        w.adroll.f = [ 'setProperties', 'identify', 'track', 'identify_email' ];
        var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id
                + "/roundtrip.js";
        for (a = 0; a < w.adroll.f.length; a++) {
            w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                return function() {
                    w.adroll.push([ n, arguments ])
                }
            })(w.adroll.f[a])
        }

        e = d.createElement('script');
        o = d.getElementsByTagName('script')[0];
        e.async = 1;
        e.src = roundtripUrl;
        o.parentNode.insertBefore(e, o);
    })(window, document);
    adroll.track("pageView");
          `,
          }}
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
  try {
        __adroll.record_user({"adroll_segments": "ddd86113"});
    } catch(err) {}
     `,
          }}
        ></script>

{/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16843608762"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-16843608762');
`,
          }}
        ></script>
        

        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1268217261070234');
fbq('track', 'PageView');
        `,
          }}
        ></script>
           <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1268217261070234');
fbq('track', 'PageView');
        `,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "virtupace",
              url: "https://virtupace.com",
              logo: "https://virtupace.com/logo.webp",
            }),
          }}
        ></script>
      </Head>
      <body>
        <noscript>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1268217261070234&ev=PageView&noscript=1"
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
