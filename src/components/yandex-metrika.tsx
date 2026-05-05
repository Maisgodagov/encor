"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

type YandexMetrikaProps = {
  counterId?: string;
};

function isValidCounterId(value: string | undefined) {
  return Boolean(value && /^\d+$/.test(value));
}

export default function YandexMetrika({ counterId }: YandexMetrikaProps) {
  const normalizedCounterId = counterId?.trim();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstHit = useRef(true);

  const pageUrl = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isValidCounterId(normalizedCounterId)) return;

    if (isFirstHit.current) {
      isFirstHit.current = false;
      return;
    }

    window.ym?.(Number(normalizedCounterId), "hit", pageUrl);
  }, [normalizedCounterId, pageUrl]);

  if (!isValidCounterId(normalizedCounterId)) {
    return null;
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${normalizedCounterId}, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
          });
        `}
      </Script>
      <noscript>
        <div
          dangerouslySetInnerHTML={{
            __html: `<img src="https://mc.yandex.ru/watch/${normalizedCounterId}" style="position:absolute; left:-9999px;" alt="" />`,
          }}
        />
      </noscript>
    </>
  );
}
