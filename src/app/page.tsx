"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import PriceCalculator from "@/components/price-calculator";
import PortfolioCarousel from "@/components/portfolio-carousel";
import ReviewsCarousel from "@/components/reviews-carousel";
import {
  HiOutlineBriefcase,
  HiOutlineChevronDown,
  HiOutlineClock,
  HiOutlineBars3,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import styled from "styled-components";

type ServiceCard = {
  title: string;
  description: string;
  details: string;
  image?: string;
};

const serviceCards: ServiceCard[] = [
  {
    title: "Проектная документация",
    image: "/img/1.png",
    description:
      "Разрабатываем проект электромонтажа под объект и этапы работ.",
    details:
      "Схемы, группы и точки подключения с учетом планировки и будущих нагрузок.",
  },
  {
    title: "Штробление стен",
    image: "/img/8.png",
    description: "Готовим штробы под линии с учетом схемы и чистовой отделки.",
    details:
      "Штробим по проектным трассам, аккуратно и с минимальным повреждением основания.",
  },
  {
    title: "Устройство проходных отверстий",
    image: "/img/9.png",
    description: "Выполняем технологические проходы для кабельных трасс.",
    details:
      "Готовим проходы под трассы с защитой кромок и аккуратной герметизацией.",
  },
  {
    title: "Монтаж электроустановки",
    image: "/img/10.png",
    description: "Монтируем и подключаем конечные точки электроустановки.",
    details:
      "Подключаем конечные точки и проверяем каждую группу перед сдачей объекта.",
  },
  {
    title: "Тёплый пол",
    image: "/img/13.png",
    description:
      "Монтируем и подключаем контуры теплого пола и терморегуляторы.",
    details:
      "Подключаем контуры и терморегуляторы, тестируем датчики и рабочие режимы.",
  },
  {
    title: "Оценка мощности оборудования и подбор номиналов автоматики",
    image: "/img/2.png",
    description: "Подбираем номиналы защиты и нагрузки согласно ПУЭ.",
    details:
      "Рассчитываем группы, подбираем автоматы и УЗО для стабильной и безопасной работы.",
  },
  {
    title: "Сборка элетрощитового оборудования",
    image: "/img/3.png",
    description: "Собираем щитовое оборудование с маркировкой и логикой групп.",
    details:
      "Собираем и расключаем щит с маркировкой групп и проверкой под нагрузкой.",
  },
  {
    title: "Прокладка кабельно-проводниковой продукции",
    image: "/img/4.png",
    description: "Монтируем кабельно-проводниковую продукцию открыто и скрыто.",
    details:
      "Прокладываем трассы открыто, в гофре, металлорукаве или в штробе по проекту.",
  },
  {
    title: "Установка распределительных коробок",
    image: "/img/5.png",
    description: "Устанавливаем коробки в удобных и технически верных точках.",
    details:
      "Размещаем коробки в доступных местах для удобного обслуживания и диагностики.",
  },

  {
    title: "Устройство и монтаж установочных коробок",
    image: "/img/7.png",
    description: "Ставим коробки в бетон, кирпич, газоблок и конструкции ГКЛ.",
    details:
      "Выставляем геометрию под чистовой монтаж розеток и выключателей без перекосов.",
  },

  {
    title: "Монтаж осветительного оборудования",
    image: "/img/11.png",
    description: "Устанавливаем светильники, группы освещения и управление.",
    details:
      "Монтируем светильники и настраиваем сценарии управления освещением.",
  },
  {
    title: "Подключение бытовых электроприборов",
    image: "/img/12.png",
    description:
      "Подключаем бытовую технику с правильным распределением линий.",
    details:
      "Подключаем технику на выделенные линии с учетом нагрузок и автоматики.",
  },

  {
    title:
      "Подключение и настройка оборудования специального назначения (антипротечка)",
    image: "/img/14.png",
    description:
      "Подключаем и настраиваем оборудование специального назначения.",
    details:
      "Интегрируем антипротечку и проверяем аварийные сценарии срабатывания.",
  },
  {
    title:
      "Соединение кабельно-проводниковой продукции в распределительных коробках методом сварки либо гильзования",
    image: "/img/6.png",
    description: "Выполняем соединения сваркой или гильзованием в коробках.",
    details:
      "Делаем надежные соединения с контролем контакта и изоляции каждой линии.",
  },
];

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Энкор",
  description:
    "Электромонтаж в Краснодаре: квартиры, дома, новостройки. Проводка, электрощит, проект, расчет нагрузок.",
  areaServed: "Краснодар",
  url: "https://encor-krd.ru",
  telephone: "+7-900-000-00-00",
};

const SHOW_SERVICE_DESCRIPTION = true;
const initialServicesCount = 8;

const Page = styled.main`
  background: #f1f1f1;
`;

const Container = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 14px;
`;

const Header = styled.header`
  background: #f1f1f1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 50;
`;

const HeaderInner = styled(Container)`
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 940px) {
    min-height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
`;

const HeaderOffset = styled.div`
  height: 73px;

  @media (max-width: 940px) {
    height: 72px;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 0.02em;
  color: #2d3036;
`;

const BrandMark = styled(Image)`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const FooterBrand = styled(Brand)`
  gap: 10px;
  font-size: 18px;
`;

const FooterBrandMark = styled(BrandMark)`
  width: 40px;
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 1120px) {
    gap: 22px;
  }

  @media (max-width: 940px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #2d3036;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.16s ease;

  @media (max-width: 1120px) {
    font-size: 16px;
  }

  &:hover {
    color: #005284;
  }

  @media (max-width: 940px) {
    white-space: nowrap;
    font-size: 15px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 940px) {
    gap: 8px;
  }
`;

const HeaderPhone = styled.a`
  color: #2d3036;
  font-size: 17px;
  font-weight: 800;

  @media (max-width: 640px) {
    display: none;
  }
`;

const BurgerButton = styled.button`
  display: none;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #2d3036;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 940px) {
    display: inline-flex;
  }

  svg {
    width: 26px;
    height: 26px;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 940px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(16, 24, 36, 0.34);
    backdrop-filter: blur(2px);
    z-index: 70;
    opacity: ${(props) => (props.$open ? 1 : 0)};
    pointer-events: ${(props) => (props.$open ? "auto" : "none")};
    transition: opacity 0.24s ease;
  }
`;

const MobileMenuInner = styled.div<{ $open: boolean }>`
  margin-left: auto;
  width: min(66.666vw, 360px);
  height: 100%;
  padding: 88px 16px 20px;
  background: #f1f1f1;
  display: grid;
  align-content: start;
  gap: 10px;
  box-shadow: -18px 0 40px rgba(16, 26, 42, 0.18);
  transform: translateX(${(props) => (props.$open ? "0" : "100%")});
  transition: transform 0.26s ease;

  @media (max-width: 520px) {
    width: min(82vw, 360px);
  }
`;

const MobileNav = styled.nav`
  display: grid;
  gap: 8px;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f8fafc;
  color: #2d3036;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #d8e0e9;
`;

const MobilePhone = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 16px;
  border-radius: 999px;
  background: #1f5373;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  width: 100%;
`;

const Hero = styled.section`
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #d8cfd0;

  @media (max-width: 940px) {
    min-height: 500px;
  }

  @media (max-width: 800px) {
    min-height: 450px;
  }

  @media (max-width: 640px) {
    min-height: 360px;
    padding: 18px 0 18px;
  }

  @media (max-width: 480px) {
    min-height: 320px;
    padding: 14px 0 14px;
  }
`;

const HeroBackgroundFrame = styled.div`
  position: absolute;
  inset: 0;
  width: min(1200px, 100%);
  height: 100%;
  margin: 0 auto;
  padding: 0 14px;
  box-sizing: border-box;
  z-index: 0;
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 14% 18%,
        rgba(255, 255, 255, 0.16) 0%,
        transparent 32%
      ),
      radial-gradient(
        circle at 72% 24%,
        rgba(255, 255, 255, 0.08) 0%,
        transparent 22%
      ),
      radial-gradient(
        circle at 80% 38%,
        rgba(122, 116, 108, 0.08) 0%,
        transparent 30%
      ),
      radial-gradient(
        circle at 36% 76%,
        rgba(118, 113, 106, 0.07) 0%,
        transparent 28%
      ),
      radial-gradient(
        circle at 58% 58%,
        rgba(255, 255, 255, 0.04) 0%,
        transparent 18%
      ),
      repeating-radial-gradient(
        circle at 20% 30%,
        rgba(255, 255, 255, 0.022) 0 1px,
        rgba(120, 115, 108, 0.018) 1px 2px,
        transparent 2px 7px
      ),
      linear-gradient(
        180deg,
        rgba(214, 210, 204, 0.24) 0%,
        rgba(191, 186, 178, 0.18) 100%
      );
    opacity: 0.5;
    mix-blend-mode: soft-light;
    pointer-events: none;
  }
`;

const HeroBackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 58% center;

  @media (max-width: 1020px) and (min-width: 941px) {
    object-position: 63% center;
  }

  @media (max-width: 940px) {
    object-position: 70% center;
  }

  @media (max-width: 640px) {
    object-position: 88% center;
  }

  @media (max-width: 480px) {
    object-position: 60% center;
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 1;
  padding-top: 16px;
  padding-left: 82px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 940px) {
    padding-top: 12px;
    padding-bottom: 28px;
    padding-left: 22px;
  }

  @media (max-width: 800px) {
    padding-top: 8px;
    padding-bottom: 18px;
    padding-left: 18px;
  }

  @media (max-width: 640px) {
    align-items: stretch;
    padding-top: 4px;
    padding-bottom: 0;
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (max-width: 480px) {
    padding-top: 2px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const H1 = styled.h1`
  color: #2d3036;
  font-size: clamp(38px, 6.6vw, 72px);
  line-height: 0.98;
  letter-spacing: -0.02em;
  max-width: 13ch;
  text-shadow:
    0 1px 2px rgba(255, 255, 255, 0.22),
    0 8px 18px rgba(108, 102, 95, 0.12);

  @media (max-width: 940px) {
    font-size: clamp(30px, 6vw, 52px);
    max-width: 11ch;
  }

  @media (max-width: 800px) {
    font-size: clamp(28px, 5.8vw, 44px);
    max-width: 10ch;
  }

  @media (max-width: 640px) {
    max-width: 10ch;
    font-size: clamp(26px, 8.6vw, 36px);
  }

  @media (max-width: 480px) {
    font-size: clamp(24px, 8.2vw, 32px);
    max-width: 9ch;
  }
`;

const Accent = styled.span`
  color: #1f5373;
`;

const HeroText = styled.p`
  margin-top: 40px;
  margin-bottom: 20px;
  color: #2d3036;
  max-width: 52ch;
  line-height: 1.5;
  font-size: 19px;
  text-shadow:
    0 1px 1px rgba(255, 255, 255, 0.18),
    0 6px 14px rgba(128, 120, 110, 0.08);

  @media (max-width: 1020px) and (min-width: 941px) {
    max-width: 39ch;
  }

  @media (max-width: 940px) {
    margin-top: 24px;
    margin-bottom: 12px;
    max-width: 32ch;
    font-size: 16px;
    line-height: 1.42;
  }

  @media (max-width: 860px) {
    max-width: 37ch;
  }

  @media (max-width: 800px) {
    margin-top: 18px;
    max-width: 34ch;
    font-size: 15px;
  }

  @media (max-width: 640px) {
    margin-top: 14px;
    font-size: 14px;
    max-width: 30ch;
    line-height: 1.34;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    font-size: 13px;
    max-width: 24ch;
    line-height: 1.28;
  }
`;

const Buttons = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 940px) {
    margin-top: 10px;
  }

  @media (max-width: 800px) {
    margin-top: 4px;
  }
`;

const PrimaryBtn = styled.a`
  background: #005284;
  color: #fff;
  border-radius: 18px;
  padding: 14px 22px;
  margin-top: 32px;
  font-weight: 600;
  font-size: 18px;

  @media (max-width: 940px) {
    margin-top: 18px;
    padding: 12px 18px;
    font-size: 16px;
  }

  @media (max-width: 800px) {
    margin-top: 12px;
    padding: 11px 16px;
    font-size: 15px;
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    text-align: center;
    font-size: 15px;
    padding: 12px 16px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const HeroPrimaryBtn = styled(PrimaryBtn)`
  background: #1f5373;
`;

const Stats = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  max-width: 560px;

  @media (max-width: 900px) and (min-width: 681px) {
    gap: 12px;
    max-width: 500px;
  }

  @media (max-width: 800px) and (min-width: 681px) {
    margin-top: 26px;
    gap: 8px;
    max-width: 430px;
  }

  @media (max-width: 680px) {
    max-width: 330px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 6px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  padding: 0;
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: start;
  gap: 6px;
  text-align: left;

  @media (max-width: 900px) and (min-width: 681px) {
    gap: 4px;
  }

  @media (max-width: 800px) and (min-width: 681px) {
    grid-template-columns: 20px 1fr;
    gap: 3px;
  }

  @media (max-width: 680px) {
    grid-template-columns: 18px 1fr;
    gap: 2px;
  }
`;

const StatText = styled.div`
  display: grid;
  gap: 2px;

  @media (max-width: 900px) and (min-width: 681px) {
    gap: 1px;
  }
`;

const StatIcon = styled.span`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  color: #2d3036;
  margin-top: 2px;

  svg {
    width: 100%;
    height: 100%;
    stroke-width: 1.8;
  }

  @media (max-width: 860px) and (min-width: 681px) {
    width: 26px;
    height: 26px;
  }

  @media (max-width: 800px) and (min-width: 681px) {
    width: 20px;
    height: 20px;
    margin-top: 1px;
  }

  @media (max-width: 680px) {
    width: 18px;
    height: 18px;
    margin-top: 1px;
  }
`;

const StatValue = styled.div`
  color: #2d3036;
  font-size: 27px;
  font-weight: 700;
  line-height: 1;
  text-shadow:
    0 1px 1px rgba(190, 86, 86, 0.14),
    0 6px 14px rgba(128, 120, 110, 0.08);

  @media (max-width: 940px) {
    font-size: 23px;
  }

  @media (max-width: 860px) and (min-width: 681px) {
    font-size: 25px;
  }

  @media (max-width: 800px) and (min-width: 681px) {
    font-size: 18px;
  }

  @media (max-width: 680px) {
    font-size: 16px;
    letter-spacing: -0.02em;
  }
`;

const StatLabel = styled.p`
  color: #2d3036;
  font-size: 14px;
  margin-top: 0;
  line-height: 1.15;
  text-shadow:
    0 1px 1px rgba(255, 255, 255, 0.14),
    0 4px 10px rgba(128, 120, 110, 0.06);

  @media (max-width: 940px) {
    font-size: 13px;
  }

  @media (max-width: 860px) and (min-width: 681px) {
    font-size: 14px;
  }

  @media (max-width: 800px) and (min-width: 681px) {
    font-size: 12px;
    line-height: 1.08;
  }

  @media (max-width: 680px) {
    font-size: 11px;
    line-height: 1.05;
  }
`;

const Section = styled.section`
  padding: 42px 0;

  @media (max-width: 640px) {
    padding: 34px 0;
  }
`;

const ContentFlow = styled.div`
  display: contents;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

const ServicesSection = styled(Section)`
  @media (max-width: 700px) {
    order: 2;
  }
`;

const H2 = styled.h2`
  margin-top: 8px;
  color: #2d3036;
  font-size: clamp(32px, 4.4vw, 48px);
  line-height: 1.03;
`;

const PortfolioTitle = styled(H2)`
  text-align: center;
`;

const ServicesTitle = styled(H2)`
  text-align: center;
  margin-bottom: 45px;

  @media (max-width: 640px) {
    margin-bottom: 28px;
  }
`;

const ServiceGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 900px) {
    gap: 16px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceMore = styled.details`
  margin-top: 22px;

  &[open] > summary {
    display: none;
  }
`;

const ServiceMoreButton = styled.summary`
  width: fit-content;
  margin: 0 auto;
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f4f6fa;
  color: #2d3036;
  box-shadow: 0 2px 4px rgba(24, 35, 56, 0.035);
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 600;

  &::-webkit-details-marker {
    display: none;
  }
`;

const ServiceCardItem = styled.article`
  background: #f4f6fa;
  border-radius: 24px;
  padding: 8px 8px 10px;
  display: grid;
  gap: 8px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 2px 4px rgba(24, 35, 56, 0.035);

  @media (max-width: 640px) {
    border-radius: 18px;
    padding: 8px;
  }

  @media (max-width: 1100px) {
    border-radius: 20px;
    padding: 7px 7px 9px;
    gap: 7px;
  }
`;

const ServiceMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  overflow: hidden;
  border-radius: 14px;

  @media (max-width: 1100px) {
    aspect-ratio: 2.35 / 1;
    border-radius: 12px;
  }

  @media (max-width: 800px) {
    aspect-ratio: 2.8 / 1;
  }

  @media (max-width: 700px) {
    aspect-ratio: 3.8 / 1;
  }
`;

const ServiceImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
`;

const ServicePlaceholder = styled.span`
  width: 100%;
  height: 100%;
  border-radius: 18px;
  border: 1px solid #ccd7e7;
  display: grid;
  place-items: center;
  color: #6f7f97;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background:
    radial-gradient(
      circle at 24% 22%,
      rgba(0, 82, 132, 0.1) 0%,
      transparent 42%
    ),
    radial-gradient(
      circle at 78% 78%,
      rgba(0, 82, 132, 0.08) 0%,
      transparent 48%
    ),
    linear-gradient(145deg, #edf3f9 0%, #e5edf6 100%);
`;

const ServiceContent = styled.div`
  padding: 0 8px 4px;
  display: grid;
  gap: 10px;

  @media (max-width: 1100px) {
    padding: 0 6px 2px;
    gap: 8px;
  }
`;

const ServiceCardTitle = styled.h3`
  margin: 0;
  color: #2d3036;
  font-size: 20px;
  line-height: 1.25;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 640px) {
    font-size: 18px;
  }

  @media (max-width: 1100px) {
    font-size: 18px;
    line-height: 1.2;
  }
`;

const ServiceDivider = styled.div`
  height: 1px;
  background: #d8dde6;
`;

const ServiceCardText = styled.p`
  margin: 0;
  color: #2d3036;
  font-size: 15px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 640px) {
    font-size: 14px;
  }

  @media (max-width: 1100px) {
    font-size: 14px;
    line-height: 1.38;
    -webkit-line-clamp: 4;
  }
`;

type ServiceItemCardProps = {
  item: ServiceCard;
};

function ServiceItemCard({ item }: ServiceItemCardProps) {
  return (
    <ServiceCardItem>
      <ServiceMedia>
        {item.image ? (
          <ServiceImage
            src={item.image}
            alt={item.title}
            width={640}
            height={360}
          />
        ) : (
          <ServicePlaceholder>Изображение услуги</ServicePlaceholder>
        )}
      </ServiceMedia>
      <ServiceContent>
        <ServiceCardTitle>{item.title}</ServiceCardTitle>
        {SHOW_SERVICE_DESCRIPTION && (
          <>
            <ServiceDivider />
            <ServiceCardText>
              {item.description} {item.details}
            </ServiceCardText>
          </>
        )}
      </ServiceContent>
    </ServiceCardItem>
  );
}

const PortfolioWrap = styled.section`
  padding: 40px 0;
  background: #e5e8ee;

  @media (max-width: 640px) {
    padding: 34px 0;
  }
`;

const ReviewsWrap = styled.section`
  padding: 42px 0;
  background: #edf1f6;

  @media (max-width: 640px) {
    padding: 34px 0;
  }
`;

const ContactsWrap = styled.section`
  padding: 44px 0 50px;
  background: #e5e8ee;

  @media (max-width: 640px) {
    padding: 34px 0 38px;
  }
`;

const ContactsGrid = styled.div`
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContactsCard = styled.div`
  background: linear-gradient(145deg, #f8fbff 0%, #eef3f8 100%);
  border: 1px solid #d7e1eb;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 10px 22px rgba(18, 28, 44, 0.06);
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 18px;
  }
`;

const ContactsLead = styled.p`
  color: #435168;
  font-size: 16px;
  line-height: 1.6;
  max-width: 52ch;
`;

const ContactsList = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
`;

const ContactsItemTitle = styled.strong`
  display: block;
  color: #1f2d46;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const ContactsItemValue = styled.div`
  margin-top: 6px;
  color: #2d3036;
  font-size: 20px;
  line-height: 1.35;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const ContactsNote = styled.p`
  color: #5c6d83;
  font-size: 14px;
  line-height: 1.55;
`;

const ContactsCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  align-self: flex-end;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  background: #1f5373;
  color: #fff;
  font-weight: 700;
  font-size: 15px;

  @media (max-width: 640px) {
    width: 100%;
    align-self: stretch;
  }
`;

const CalcSection = styled.section`
  position: relative;
  background: #d8cfd0;
  padding: clamp(40px, 6vw, 64px) 0;
  overflow: hidden;

  @media (max-width: 700px) {
    order: 1;
  }
`;

const CalcGrid = styled(Container)`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: stretch;
`;

const CalcTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 22px;
  color: #1f2d46;
  font-size: clamp(28px, 3.6vw, 40px);
  line-height: 1.08;
  text-align: center;
`;

const CalcCard = styled.div`
  position: relative;
  background: linear-gradient(145deg, #eef2f5 0%, #e4eaef 45%, #dce4ea 100%);
  border-radius: 18px;
  border: 1px solid #bac6d1;
  padding: clamp(26px, 3.4vw, 34px) clamp(28px, 4vw, 42px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 7px 14px rgba(8, 30, 53, 0.1);
  width: 94%;
  margin: 0 auto;
  min-height: 360px;

  @media (max-width: 980px) {
    width: 100%;
  }

  @media (max-width: 640px) {
    padding: 22px 18px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    border-radius: 14px;
  }
`;

const CalcBody = styled.div`
  display: grid;
  grid-template-columns: 1.75fr 1.1fr;
  gap: 16px;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const LeadForm = styled.form`
  display: grid;
  gap: 12px;
  align-content: start;
  margin-top: 0;
  background: #f3f6f9;
  border-radius: 12px;
  padding: 14px;
  height: 100%;

  @media (max-width: 640px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    padding: 10px;
  }
`;

const LeadField = styled.input`
  height: 44px;
  border-radius: 10px;
  border: none;
  background: #e7edf3;
  color: #2d3036;
  padding: 0 14px;

  &::placeholder {
    color: #6b7a8c;
  }

  @media (max-width: 480px) {
    height: 40px;
    padding: 0 12px;
  }
`;

const LeadError = styled.p`
  margin-top: -6px;
  color: #b54747;
  font-size: 12px;
  line-height: 1.35;
`;

const LeadSubmit = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 999px;
  border: 1px solid #1f5373;
  background: #1f5373;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  padding: 0 18px;

  &:disabled {
    opacity: 0.72;
    cursor: default;
  }

  @media (max-width: 480px) {
    height: 46px;
    font-size: 15px;
  }
`;

const LeadPrice = styled.strong<{ $isFallback?: boolean }>`
  display: block;
  margin-top: 0;
  color: #1f2d46;
  font-size: ${(props) =>
    props.$isFallback
      ? "clamp(16px, 1.9vw, 22px)"
      : "clamp(24px, 2.8vw, 32px)"};
  line-height: 1;
  letter-spacing: -0.01em;
`;

const LeadHint = styled.p`
  margin-top: 2px;
  color: #6b7a8c;
  font-size: 12px;
  line-height: 1.45;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    align-items: flex-start;
  }
`;

const LeadHintIcon = styled.span`
  flex: 0 0 auto;
  line-height: 1;

  svg {
    width: 14px;
    height: 14px;
    color: #8fa2b7;
  }
`;

const LeadPriceCard = styled.div`
  background: #e7edf3;
  border-radius: 10px;
  padding: 14px;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const LeadPriceLabel = styled.p`
  color: #8897a9;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
`;

const LeadSuccess = styled.p`
  margin-top: 10px;
  color: #1f5373;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

const Bolt = styled.span<{ $pos: "tl" | "tr" | "bl" | "br" }>`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #8e9ca9;
  background: radial-gradient(
    circle at 32% 30%,
    #fbfdff 0%,
    #b7c2cc 48%,
    #8a98a6 100%
  );
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.42);
  z-index: 2;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    background: #72808d;
    transform: translate(-50%, -50%);
  }

  &::before {
    width: 8px;
    height: 1px;
  }

  &::after {
    width: 1px;
    height: 8px;
  }

  ${(props) => props.$pos === "tl" && "left: 10px; top: 10px;"}
  ${(props) => props.$pos === "tr" && "right: 10px; top: 10px;"}
  ${(props) => props.$pos === "bl" && "left: 10px; bottom: 10px;"}
  ${(props) => props.$pos === "br" && "right: 10px; bottom: 10px;"}

  @media (max-width: 640px) {
    display: none;
  }
`;

const Footer = styled.footer`
  background: #e9edf3;
`;

const FooterTop = styled(Container)`
  padding: 22px 14px 18px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 18px 22px;
  border-radius: 18px;
  border: 1px solid #d7e0ea;
  background: linear-gradient(145deg, #f7fafe 0%, #eef3f8 100%);
  box-shadow: 0 8px 20px rgba(18, 28, 44, 0.05);

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 18px;
  }

  @media (max-width: 640px) {
    align-items: center;
    text-align: center;
  }
`;

const FooterText = styled.p`
  color: #516075;
  line-height: 1.55;
  font-size: 15px;
  margin: 0;
  max-width: 70ch;

  @media (max-width: 640px) {
    max-width: none;
  }
`;

const FooterBottom = styled(Container)`
  border-top: 1px solid #d8deea;
  color: #5c6b80;
  font-size: 12px;
  padding: 12px 14px 20px;
  text-align: center;
`;

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadSent, setIsLeadSent] = useState(false);
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("+7");
  const [leadPhoneError, setLeadPhoneError] = useState("");
  const [leadSubmitError, setLeadSubmitError] = useState("");
  const [calcState, setCalcState] = useState({
    ready: false,
    resultText: "—",
  });

  const normalizePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const normalized = digits.startsWith("7")
      ? digits
      : digits.startsWith("8")
        ? `7${digits.slice(1)}`
        : `7${digits}`;
    return `+${normalized.slice(0, 11)}`.slice(0, 12);
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadPhoneError("");
    setLeadSubmitError("");

    const trimmedName = leadName.trim();
    const normalizedPhone = normalizePhone(leadPhone);
    const digits = normalizedPhone.replace(/\D/g, "");
    const calcDetails = calcState as {
      ready: boolean;
      resultText: string;
      objectType?: "apartment" | "private_house" | "";
      objectTypeLabel?: string;
      roomType?: "1" | "2" | "3" | "4_plus" | "";
      roomTypeLabel?: string;
      points?: number;
    };

    if (!trimmedName) {
      setLeadSubmitError("Введите имя");
      return;
    }

    if (digits.length !== 11 || !digits.startsWith("7")) {
      setLeadPhoneError("Введите корректный номер телефона");
      return;
    }

    if (!calcDetails.ready || !calcDetails.resultText) {
      setLeadSubmitError("Сначала заполните параметры расчета");
      return;
    }

    setIsLeadSubmitting(true);

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
      const response = await fetch(`${apiBaseUrl}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: normalizedPhone,
          resultText: calcDetails.resultText,
          objectType: calcDetails.objectType ?? "",
          objectTypeLabel: calcDetails.objectTypeLabel ?? "",
          roomType: calcDetails.roomType ?? "",
          roomTypeLabel: calcDetails.roomTypeLabel ?? "",
          points: calcDetails.points ?? 0,
        }),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      setLeadName("");
      setLeadPhone("+7");
      setIsLeadSent(true);
    } catch {
      setLeadSubmitError("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setIsLeadSubmitting(false);
    }
  };

  return (
    <Page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />

      <Header>
        <HeaderInner>
          <Brand href="#top">
            <BrandMark
              src="/logo.svg"
              alt="Логотип Энкор"
              width={40}
              height={40}
            />
            ЭНКОР
          </Brand>
          <Nav>
            <NavLink href="#services">Услуги</NavLink>
            <NavLink href="#portfolio">Примеры работ</NavLink>
            <NavLink href="#reviews">Отзывы</NavLink>
            <NavLink href="#calculator">Рассчитать стоимость</NavLink>
            <NavLink href="#contacts">Контакты</NavLink>
          </Nav>
          <HeaderActions>
            <HeaderPhone href="tel:+79189816434">+7 918 981-64-34</HeaderPhone>
            <BurgerButton
              type="button"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
            >
              {isMobileMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
            </BurgerButton>
          </HeaderActions>
        </HeaderInner>
        <MobileMenu
          $open={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <MobileMenuInner
            $open={isMobileMenuOpen}
            onClick={(event) => event.stopPropagation()}
          >
            <MobileNav>
              <MobileNavLink
                href="#services"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Услуги
              </MobileNavLink>
              <MobileNavLink
                href="#portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Примеры работ
              </MobileNavLink>
              <MobileNavLink
                href="#reviews"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Отзывы
              </MobileNavLink>
              <MobileNavLink
                href="#calculator"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Рассчитать стоимость
              </MobileNavLink>
              <MobileNavLink
                href="#contacts"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Контакты
              </MobileNavLink>
            </MobileNav>
            <MobilePhone href="tel:+79189816434">+7 918 981-64-34</MobilePhone>
          </MobileMenuInner>
        </MobileMenu>
      </Header>
      <HeaderOffset />

      <Hero id="top">
        <HeroBackgroundFrame>
          <HeroBackground>
            <HeroBackgroundImage
              src="/img/hero.png"
              alt="Электромонтажные работы Энкор"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </HeroBackground>
        </HeroBackgroundFrame>
        <HeroContent>
          <H1>
            Электромонтаж
            <br />
            <span style={{ whiteSpace: "nowrap" }}>
              в <Accent>Краснодаре</Accent>
            </span>
          </H1>
          <HeroText>
            Премиальные инженерные решения для квартир, частных домов и
            новостроек. Проект, монтаж, пуск и гарантийное сопровождение.
          </HeroText>
          <Stats>
            <StatItem>
              <StatIcon>
                <HiOutlineBriefcase />
              </StatIcon>
              <StatText>
                <StatValue>500+</StatValue>
                <StatLabel>Выполненных проектов</StatLabel>
              </StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <HiOutlineShieldCheck />
              </StatIcon>
              <StatText>
                <StatValue>10 лет</StatValue>
                <StatLabel>Опыта и гарантии качества</StatLabel>
              </StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <HiOutlineClock />
              </StatIcon>
              <StatText>
                <StatValue>24ч</StatValue>
                <StatLabel>Скорость первичного ответа</StatLabel>
              </StatText>
            </StatItem>
          </Stats>
          <Buttons>
            <HeroPrimaryBtn href="#calculator">
              Рассчитать стоимость
            </HeroPrimaryBtn>
          </Buttons>
        </HeroContent>
      </Hero>

      <ContentFlow>
        <ServicesSection id="services">
          <Container>
            <ServicesTitle>Что мы делаем</ServicesTitle>
            <ServiceGrid>
              {serviceCards.slice(0, initialServicesCount).map((item) => (
                <ServiceItemCard key={item.title} item={item} />
              ))}
            </ServiceGrid>
            {serviceCards.length > initialServicesCount && (
              <ServiceMore>
                <ServiceMoreButton>
                  <HiOutlineChevronDown />
                  Показать все услуги
                </ServiceMoreButton>
                <ServiceGrid>
                  {serviceCards.slice(initialServicesCount).map((item) => (
                    <ServiceItemCard key={item.title} item={item} />
                  ))}
                </ServiceGrid>
              </ServiceMore>
            )}
          </Container>
        </ServicesSection>

        <CalcSection id="calculator">
          <CalcGrid>
            <CalcCard>
              <Bolt $pos="tl" />
              <Bolt $pos="tr" />
              <Bolt $pos="bl" />
              <Bolt $pos="br" />
              <CalcTitle>Рассчитать стоимость</CalcTitle>
              <CalcBody>
                <PriceCalculator
                  showResult={false}
                  onStateChange={setCalcState}
                />
                <LeadForm id="lead-form" onSubmit={handleLeadSubmit}>
                  <LeadPriceCard>
                    <LeadPriceLabel>Ориентировочная стоимость</LeadPriceLabel>
                    <LeadPrice
                      $isFallback={
                        calcState.resultText === "Нужен индивидуальный расчет"
                      }
                    >
                      {calcState.resultText}
                    </LeadPrice>
                  </LeadPriceCard>
                  <LeadField
                    type="text"
                    placeholder="Ваше имя"
                    value={leadName}
                    onChange={(event) => {
                      setLeadName(event.target.value);
                      setIsLeadSent(false);
                      setLeadSubmitError("");
                    }}
                  />
                  <LeadField
                    type="tel"
                    placeholder="Номер телефона"
                    value={leadPhone}
                    onChange={(event) => {
                      setLeadPhone(normalizePhone(event.target.value));
                      setLeadPhoneError("");
                      setIsLeadSent(false);
                      setLeadSubmitError("");
                    }}
                  />
                  {leadPhoneError && <LeadError>{leadPhoneError}</LeadError>}
                  {leadSubmitError && <LeadError>{leadSubmitError}</LeadError>}
                  <LeadSubmit type="submit" disabled={isLeadSubmitting}>
                    {isLeadSubmitting ? "Отправка..." : "Оставить заявку"}
                  </LeadSubmit>
                  <LeadHint>
                    <LeadHintIcon>
                      <HiOutlineInformationCircle />
                    </LeadHintIcon>
                    Расчет ориентировочный. Точную смету формируем после осмотра
                    объекта и уточнения состава работ.
                  </LeadHint>
                  {isLeadSent && (
                    <LeadSuccess>
                      Ваша заявка принята, мы свяжемся с вами в ближайшее время
                    </LeadSuccess>
                  )}
                </LeadForm>
              </CalcBody>
            </CalcCard>
          </CalcGrid>
        </CalcSection>
      </ContentFlow>

      <PortfolioWrap id="portfolio">
        <Container>
          <PortfolioTitle>Качество работ в деталях</PortfolioTitle>
          <PortfolioCarousel />
        </Container>
      </PortfolioWrap>

      <ReviewsWrap id="reviews">
        <Container>
          <PortfolioTitle>Отзывы клиентов</PortfolioTitle>
          <ReviewsCarousel />
        </Container>
      </ReviewsWrap>

      <ContactsWrap id="contacts">
        <Container>
          <PortfolioTitle>Контакты</PortfolioTitle>
          <ContactsGrid>
            <ContactsCard>
              <ContactsLead>
                Консультируем по электромонтажу квартир, частных домов и
                новостроек. Поможем с расчетом стоимости, подбором решений и
                выездом на объект в Краснодаре.
              </ContactsLead>
              <ContactsList>
                <div>
                  <ContactsItemTitle>Телефон</ContactsItemTitle>
                  <ContactsItemValue>+7 918 981-64-34</ContactsItemValue>
                </div>
                <div>
                  <ContactsItemTitle>Электронная почта</ContactsItemTitle>
                  <ContactsItemValue>infso@encor-krd.ru</ContactsItemValue>
                </div>
                <div>
                  <ContactsItemTitle>Город</ContactsItemTitle>
                  <ContactsItemValue>Краснодар</ContactsItemValue>
                </div>
              </ContactsList>
            </ContactsCard>
            <ContactsCard>
              <ContactsItemTitle>График связи</ContactsItemTitle>
              <ContactsItemValue>Ежедневно с 9:00 до 21:00</ContactsItemValue>
              <ContactsNote style={{ marginTop: "16px" }}>
                Если не ответили сразу, перезвоним в ближайшее время. Также
                можно оставить заявку через форму расчета стоимости выше.
              </ContactsNote>
              <ContactsNote style={{ marginTop: "14px" }}>
                Работаем по Краснодару. Выезд на объект согласовывается заранее.
              </ContactsNote>
              <ContactsCta href="#calculator">Оставить заявку</ContactsCta>
            </ContactsCard>
          </ContactsGrid>
        </Container>
      </ContactsWrap>

      <Footer>
        <FooterTop>
          <FooterGrid>
            <div>
              <FooterRow>
                <FooterBrand href="#top">
                  <FooterBrandMark
                    src="/logo.svg"
                    alt="Логотип Энкор"
                    width={40}
                    height={40}
                  />
                  ЭНКОР
                </FooterBrand>
                <FooterText>
                  Электромонтаж в Краснодаре. Профессиональные инженерные
                  решения для частных и коммерческих объектов.
                </FooterText>
              </FooterRow>
            </div>
          </FooterGrid>
        </FooterTop>
        <FooterBottom>
          © 2026 Энкор Электромонтаж. Все права защищены.
        </FooterBottom>
      </Footer>
    </Page>
  );
}
