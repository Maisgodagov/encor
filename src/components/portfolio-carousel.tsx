"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePlay,
  HiOutlineXMark,
} from "react-icons/hi2";
import styled from "styled-components";

type PortfolioItem = {
  title: string;
  type: "image" | "video";
  orientation: "landscape" | "portrait";
  src: string;
  poster?: string;
};

const items: PortfolioItem[] = [
  {
    title: "Щит в частном доме",
    type: "image",
    orientation: "portrait",
    src: "/img/3.png",
  },
  {
    title: "Световые группы и монтаж",
    type: "image",
    orientation: "landscape",
    src: "/img/11.png",
  },
  {
    title: "Соединения и проверка линий",
    type: "image",
    orientation: "portrait",
    src: "/img/6.png",
  },
  {
    title: "Проходные выключатели",
    type: "image",
    orientation: "landscape",
    src: "/img/10.png",
  },
  {
    title: "Сборка и маркировка групп",
    type: "image",
    orientation: "portrait",
    src: "/img/5.png",
  },
  {
    title: "Точки и расключение",
    type: "image",
    orientation: "landscape",
    src: "/img/4.png",
  },
];

const Wrap = styled.div`
  position: relative;
  padding: 0 38px;

  @media (max-width: 720px) {
    padding: 0 24px;
  }
`;

const Track = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: stretch;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
  padding-bottom: 6px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.button<{ $orientation: "landscape" | "portrait" }>`
  position: relative;
  flex: 0 0
    ${(props) =>
      props.$orientation === "portrait"
        ? "min(290px, 58vw)"
        : "min(420px, 82vw)"};
  min-height: ${(props) => (props.$orientation === "portrait" ? "360px" : "260px")};
  scroll-snap-align: start;
  border: none;
  border-radius: 18px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  background:
    linear-gradient(180deg, rgba(10, 21, 38, 0.02), rgba(10, 21, 38, 0.3)),
    #d7e0ea;
  box-shadow: 0 12px 22px rgba(17, 28, 46, 0.12);
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 16, 30, 0.04) 0%, rgba(8, 16, 30, 0.14) 44%, rgba(8, 16, 30, 0.66) 100%);
`;

const CardMeta = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 18px;
  color: #f4f7fb;
  text-align: left;
`;

const CardBadge = styled.span`
  width: fit-content;
  border-radius: 999px;
  background: rgba(244, 247, 251, 0.18);
  border: 1px solid rgba(244, 247, 251, 0.28);
  padding: 6px 10px;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const VideoMark = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(10, 20, 36, 0.52);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  display: grid;
  place-items: center;
`;

const Arrow = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.$left ? "left: -10px;" : "right: -10px;")}
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid #c8d4e1;
  background: #f7f9fc;
  color: #2d3036;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 6px 14px rgba(20, 31, 48, 0.12);

  @media (max-width: 720px) {
    width: 36px;
    height: 36px;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(9, 15, 25, 0.76);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  padding: 24px;
  z-index: 120;
`;

const ModalCard = styled.div`
  position: relative;
  width: min(1100px, 100%);
  max-height: min(90vh, 920px);
  border-radius: 20px;
  overflow: visible;
  background: #0d1625;
  box-shadow: 0 30px 80px rgba(4, 8, 16, 0.45);
`;

const ModalArrow = styled(Arrow)`
  ${(props) => (props.$left ? "left: 12px;" : "right: 12px;")}
  z-index: 3;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(11, 17, 29, 0.58);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 2;
`;

const ModalMedia = styled.div`
  position: relative;
  width: 100%;
  height: min(78vh, 820px);
  background: #0d1625;
  border-radius: 20px;
  overflow: hidden;
`;

const ModalImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ModalVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #0d1625;
`;

export default function PortfolioCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + items.length) % items.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % items.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const scrollByStep = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(440, Math.max(260, Math.floor(el.clientWidth * 0.78)));
    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const shiftModal = (dir: "prev" | "next") => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return dir === "prev"
        ? (current - 1 + items.length) % items.length
        : (current + 1) % items.length;
    });
  };

  return (
    <>
      <Wrap>
        <Arrow
          $left
          type="button"
          onClick={() => scrollByStep("left")}
          aria-label="Прокрутить влево"
        >
          <HiOutlineChevronLeft />
        </Arrow>
        <Track ref={trackRef}>
          {items.map((item) => (
            <Card
              key={`${item.type}-${item.src}-${item.title}`}
              type="button"
              $orientation={item.orientation}
              onClick={() => setActiveIndex(items.findIndex((entry) => entry.src === item.src))}
            >
              <CardImage
                src={item.type === "video" ? item.poster || item.src : item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 78vw, 420px"
              />
              <CardOverlay />
              {item.type === "video" && (
                <VideoMark>
                  <HiOutlinePlay />
                </VideoMark>
              )}
              <CardMeta>
                <CardBadge>
                  {item.type === "video" ? "Видео" : "Фото"}
                </CardBadge>
              </CardMeta>
            </Card>
          ))}
        </Track>
        <Arrow
          type="button"
          onClick={() => scrollByStep("right")}
          aria-label="Прокрутить вправо"
        >
          <HiOutlineChevronRight />
        </Arrow>
      </Wrap>

      {activeItem && (
        <ModalBackdrop onClick={() => setActiveIndex(null)}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <CloseButton
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Закрыть"
            >
              <HiOutlineXMark />
            </CloseButton>
            <ModalArrow
              $left
              type="button"
              onClick={() => shiftModal("prev")}
              aria-label="Предыдущее медиа"
            >
              <HiOutlineChevronLeft />
            </ModalArrow>
            <ModalArrow
              type="button"
              onClick={() => shiftModal("next")}
              aria-label="Следующее медиа"
            >
              <HiOutlineChevronRight />
            </ModalArrow>
            <ModalMedia>
              {activeItem.type === "video" ? (
                <ModalVideo
                  controls
                  autoPlay
                  poster={activeItem.poster}
                  src={activeItem.src}
                />
              ) : (
                <ModalImage
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                />
              )}
            </ModalMedia>
          </ModalCard>
        </ModalBackdrop>
      )}
    </>
  );
}
