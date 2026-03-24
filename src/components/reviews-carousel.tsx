"use client";

import { useRef } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import styled from "styled-components";

type ReviewItem = {
  text: string;
  author: string;
  meta: string;
};

const items: ReviewItem[] = [
  {
    text: "Делали электрику в новой квартире с нуля. Без проекта, просто по плану расстановки мебели. Ребята подсказали, где лучше добавить розетки, где убрать лишнее. В итоге получилось удобно, ничего не переделывали. Работу сделали аккуратно, сроки выдержали.",
    author: "Иван",
    meta: "Квартира, 2 комнаты",
  },
  {
    text: "Заказывали полный электромонтаж + теплый пол в санузле и кухне. Всё сделали за один заход, без растягивания. По теплому полу отдельно объяснили, как пользоваться и какие режимы лучше ставить. Пока всё работает как надо.",
    author: "Екатерина",
    meta: "Квартира, 2 комнаты",
  },
  {
    text: "Квартира в новостройке, нужно было полностью с нуля. Сделали разводку, щиток, заложили трассы под кондиционеры. Понравилось, что не просто делают «как сказали», а предлагают нормальные решения. По цене - как договаривались.",
    author: "Артем",
    meta: "Квартира, 2 комнаты",
  },
  {
    text: "Обращались по электрике под ремонт. Было много техники, переживали за нагрузку. Всё грамотно распределили, сделали отдельные линии. Работали спокойно, без лишнего шума и суеты. После себя всё убрали.",
    author: "Ольга",
    meta: "Квартира, 3 комнаты",
  },
  {
    text: "Делали электрику в частном доме + теплый пол по первому этажу. Объем был большой. Сделали поэтапно, без спешки, но в срок уложились. Всё подписано, понятно где что. В целом доволен.",
    author: "Максим",
    meta: "Частный дом",
  },
  {
    text: "Нужно было переделать электрику после предыдущих «мастеров». Много косяков нашли. Всё исправили, собрали новый щиток. Сейчас стало спокойно пользоваться техникой, раньше постоянно выбивало автоматы.",
    author: "Наталья",
    meta: "Квартира, 2 комнаты",
  },
  {
    text: "Офис 120 м², делали полностью электромонтаж и освещение. Работали по нашему плану, но по ходу предложили пару улучшений. В итоге получилось удобнее. Сроки не сорвали, это было важно.",
    author: "Андрей",
    meta: "Офис, 120 м²",
  },
  {
    text: "Делали электрику под ключ. Понравилось, что всё сразу продумали - и улицу, и освещение, и автоматику. Не пришлось потом что-то доделывать. По работе вопросов нет.",
    author: "Сергей",
    meta: "Частный дом",
  },
  {
    text: "Квартира после застройщика, решили всё переделать сразу. Сделали новую проводку, добавили много розеток, вывели под кухню всё как нужно. Работы прошли без проблем, всегда были на связи.",
    author: "Алина",
    meta: "Квартира, 2 комнаты",
  },
  {
    text: "Делали теплый пол и электрику в квартире. Всё подключили, проверили при нас. Объяснили по эксплуатации. Уже пользуемся - греет нормально, без перебоев.",
    author: "Виктор",
    meta: "Квартира, 1 комната",
  },
  {
    text: "Обратился по рекомендации. Делали электромонтаж в новостройке. Всё четко: приехали, посчитали, сделали. Без «всплывающих» доплат. Такой подход сейчас редко встречается.",
    author: "Денис",
    meta: "Квартира, 1 комната",
  },
  {
    text: "Делали электрику под дизайн-проект. Все размеры выдержали, ничего не пришлось переделывать. Для меня это было важно. Работали аккуратно, стены не «убили».",
    author: "Юлия",
    meta: "Квартира, 3 комнаты",
  },
  {
    text: "Частный дом, большой объем работ: электрика, щит, теплый пол, освещение участка. Сделали всё комплексно. Удобно, что не пришлось искать разных подрядчиков.",
    author: "Роман",
    meta: "Частный дом",
  },
  {
    text: "Квартира в ремонте, нужно было быстро сделать электрику. Вошли в положение, начали почти сразу. Работы выполнили в оговоренные сроки. По качеству вопросов нет.",
    author: "Кирилл",
    meta: "Квартира, 2 комнаты",
  },
  {
    text: "Делали электрику и теплый пол в ванной и на кухне. Всё аккуратно, без лишней грязи. После завершения объяснили, как пользоваться. Работой довольна.",
    author: "Мария",
    meta: "Квартира, 2 комнаты",
  },
];

const Wrap = styled.div`
  position: relative;
  padding: 0 38px;

  @media (max-width: 720px) {
    padding: 0 12px;
  }
`;

const Track = styled.div`
  margin-top: 22px;
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
  padding-bottom: 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.article`
  flex: 0 0 calc((100% - 32px) / 3);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #f8fbff 0%, #eef3f8 100%);
  border-radius: 18px;
  border: 1px solid #d7e1eb;
  padding: 22px;
  box-shadow: none;

  @media (max-width: 980px) {
    flex: 0 0 calc((100% - 16px) / 2);
  }

  @media (max-width: 680px) {
    flex: 0 0 min(320px, 82vw);
    padding: 18px;
    border-radius: 16px;
  }
`;

const ReviewText = styled.p`
  color: #39465a;
  font-size: 15px;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const ReviewFooter = styled.div`
  margin-top: auto;
  padding-top: 18px;
`;

const ReviewAuthor = styled.strong`
  display: block;
  color: #1f2d46;
  font-size: 16px;
`;

const ReviewMeta = styled.span`
  display: block;
  margin-top: 4px;
  color: #6d7d92;
  font-size: 13px;
`;

const Arrow = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.$left ? "left: -12px;" : "right: -12px;")}
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
    ${(props) => (props.$left ? "left: -4px;" : "right: -4px;")}
  }
`;

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByStep = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(380, Math.max(260, Math.floor(el.clientWidth * 0.72)));
    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <Wrap>
      <Arrow $left type="button" onClick={() => scrollByStep("left")} aria-label="Прокрутить отзывы влево">
        <HiOutlineChevronLeft />
      </Arrow>
      <Track ref={trackRef}>
        {items.map((item) => (
          <Card key={`${item.author}-${item.meta}`}>
            <ReviewText>{item.text}</ReviewText>
            <ReviewFooter>
              <ReviewAuthor>{item.author}</ReviewAuthor>
              <ReviewMeta>{item.meta}</ReviewMeta>
            </ReviewFooter>
          </Card>
        ))}
      </Track>
      <Arrow type="button" onClick={() => scrollByStep("right")} aria-label="Прокрутить отзывы вправо">
        <HiOutlineChevronRight />
      </Arrow>
    </Wrap>
  );
}
