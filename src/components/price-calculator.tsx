"use client";

import { useEffect, useMemo, useState } from "react";
import { HiOutlineBuildingOffice2, HiOutlineHomeModern } from "react-icons/hi2";
import styled from "styled-components";

type ObjectType = "apartment" | "private_house";
type RoomType = "1" | "2" | "3" | "4_plus";

type Bracket = {
  minPoints: number;
  maxPoints: number | null;
  minPrice: number;
  maxPrice: number | null;
};

const apartmentRates: Record<RoomType, Bracket[]> = {
  "1": [
    { minPoints: 20, maxPoints: 25, minPrice: 70000, maxPrice: 90000 },
    { minPoints: 25, maxPoints: 35, minPrice: 90000, maxPrice: 120000 },
    { minPoints: 35, maxPoints: 50, minPrice: 120000, maxPrice: 150000 },
  ],
  "2": [
    { minPoints: 35, maxPoints: 50, minPrice: 130000, maxPrice: 160000 },
    { minPoints: 50, maxPoints: 70, minPrice: 160000, maxPrice: 190000 },
    { minPoints: 70, maxPoints: 90, minPrice: 190000, maxPrice: 230000 },
  ],
  "3": [
    { minPoints: 50, maxPoints: 70, minPrice: 170000, maxPrice: 200000 },
    { minPoints: 70, maxPoints: 90, minPrice: 200000, maxPrice: 250000 },
    { minPoints: 90, maxPoints: 120, minPrice: 250000, maxPrice: 340000 },
  ],
  "4_plus": [
    { minPoints: 80, maxPoints: 110, minPrice: 260000, maxPrice: 340000 },
    { minPoints: 110, maxPoints: 150, minPrice: 340000, maxPrice: 460000 },
    { minPoints: 150, maxPoints: null, minPrice: 460000, maxPrice: null },
  ],
};

const houseRates: Bracket[] = [
  { minPoints: 50, maxPoints: 90, minPrice: 200000, maxPrice: 280000 },
  { minPoints: 90, maxPoints: 120, minPrice: 280000, maxPrice: 400000 },
  { minPoints: 120, maxPoints: null, minPrice: 400000, maxPrice: null },
];

const Wrap = styled.div<{ $selected: boolean }>`
  display: grid;
  gap: 14px;
  min-height: 0;
  grid-template-rows: auto;
  justify-items: start;
  width: 100%;
  align-content: start;
`;

const Field = styled.label<{ $variant?: "default" | "compact" }>`
  display: grid;
  gap: 12px;
  color: #2a4463;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  height: auto;
  align-content: start;
  justify-items: start;
  text-align: left;
  width: 100%;
  background: ${(props) => (props.$variant === "compact" ? "#f3f6f9" : "#e6ebf0")};
  border: none;
  border-radius: 12px;
  padding: ${(props) => (props.$variant === "compact" ? "10px 14px 14px" : "14px")};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  justify-items: start;
  width: 100%;
`;

const TypeButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-start;
  width: 100%;
`;

const TypeButton = styled.button<{ $active?: boolean }>`
  height: 42px;
  width: calc((100% - 8px) / 2);
  min-width: 0;
  border-radius: 10px;
  border: ${(props) => (props.$active ? "none" : "1px solid #ccd8e7")};
  background: ${(props) => (props.$active ? "#1f5373" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#3f4b63")};
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.16s ease;

  &:hover {
    border-color: #b8c8d8;
  }

  @media (max-width: 640px) {
    width: 100%;
    max-width: 320px;
  }
`;

const TypeButtonsStage = styled(TypeButtons)<{ $selected: boolean }>`
  height: auto;
  min-height: 0;
  align-items: stretch;

  ${TypeButton} {
    height: ${(props) => (props.$selected ? "42px" : "42px")};
    transition: height 0.24s ease;
  }

  ${TypeButton} svg {
    width: 14px;
    height: 14px;
    transition: width 0.24s ease, height 0.24s ease;
  }
`;

const RoomButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  justify-content: flex-start;
  width: 100%;
`;

const RoomButton = styled.button<{ $active?: boolean }>`
  height: 40px;
  width: calc((100% - 24px) / 4);
  border-radius: 10px;
  border: ${(props) => (props.$active ? "none" : "1px solid #ccd8e7")};
  background: ${(props) => (props.$active ? "#1f5373" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#3f4b63")};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.16s ease;
`;

const SliderWrap = styled.div`
  display: grid;
  gap: 10px;
  justify-items: start;
  width: 100%;
`;

const PointsValue = styled.strong`
  color: #005284;
  font-size: 22px;
  line-height: 1;
`;

const Slider = styled.input`
  width: min(520px, 100%);
  accent-color: #005284;
  border: none;
`;

const Result = styled.div`
  padding: 2px 0 0;
  text-align: left;
  width: min(560px, 100%);
  max-width: 100%;
`;

const Price = styled.strong`
  display: block;
  margin-top: 8px;
  color: #005284;
  font-size: clamp(24px, 3.8vw, 34px);
  line-height: 1;
`;

const Hint = styled.p`
  margin-top: 6px;
  color: #5a6a80;
  font-size: 13px;
  line-height: 1.45;
`;

function formatRange(min: number, max: number | null) {
  if (max === null) return `от ${min.toLocaleString("ru-RU")} \u20BD`;
  return `${min.toLocaleString("ru-RU")} - ${max.toLocaleString("ru-RU")} \u20BD`;
}

function findRate(points: number, rates: Bracket[]) {
  return rates.find((rate) => {
    const fitsMin = points >= rate.minPoints;
    const fitsMax = rate.maxPoints === null ? true : points <= rate.maxPoints;
    return fitsMin && fitsMax;
  });
}

type CalculatorState = {
  ready: boolean;
  resultText: string;
  objectType: ObjectType | "";
  objectTypeLabel: string;
  roomType: RoomType | "";
  roomTypeLabel: string;
  points: number;
};

type PriceCalculatorProps = {
  showResult?: boolean;
  onStateChange?: (state: CalculatorState) => void;
};

export default function PriceCalculator({
  showResult = true,
  onStateChange,
}: PriceCalculatorProps) {
  const [objectType, setObjectType] = useState<ObjectType | "">("");
  const [roomType, setRoomType] = useState<RoomType | "">("");
  const [points, setPoints] = useState(50);

  const hasPoints = points > 0;
  const hasRoomType = roomType !== "";
  const hasFullInput = objectType !== "" && hasRoomType && hasPoints;

  const currentRates = useMemo(() => {
    if (objectType === "apartment" && roomType !== "") return apartmentRates[roomType];
    if (objectType === "private_house") return houseRates;
    return [] as Bracket[];
  }, [objectType, roomType]);

  const minPointsByRoom: Record<RoomType, number> = {
    "1": 20,
    "2": 35,
    "3": 50,
    "4_plus": 80,
  };
  const minPoints = objectType === "apartment" && roomType !== "" ? minPointsByRoom[roomType] : 5;
  const effectivePoints = Math.max(points, minPoints);

  const matched = useMemo(() => {
    if (!hasFullInput) return undefined;
    return findRate(effectivePoints, currentRates);
  }, [currentRates, effectivePoints, hasFullInput]);

  const resultText = !hasFullInput
    ? ""
    : matched
      ? formatRange(matched.minPrice, matched.maxPrice)
      : "Нужен индивидуальный расчет";
  const objectTypeLabel =
    objectType === "apartment"
      ? "Квартира"
      : objectType === "private_house"
        ? "Частный дом"
        : "";
  const roomTypeLabel =
    roomType === "1"
      ? "1"
      : roomType === "2"
        ? "2"
        : roomType === "3"
          ? "3"
          : roomType === "4_plus"
            ? "4+"
            : "";
  const isObjectSelected = objectType !== "";
  useEffect(() => {
    onStateChange?.({
      ready: hasFullInput,
      resultText,
      objectType,
      objectTypeLabel,
      roomType,
      roomTypeLabel,
      points: effectivePoints,
    });
  }, [effectivePoints, hasFullInput, objectType, objectTypeLabel, onStateChange, resultText, roomType, roomTypeLabel]);

  return (
    <Wrap $selected={isObjectSelected}>
      <Field $variant="compact">
        Выберите тип объекта
        <TypeButtonsStage $selected={isObjectSelected}>
          <TypeButton
            type="button"
            $active={objectType === "apartment"}
            onClick={() => {
              setObjectType("apartment");
              setRoomType("");
            }}
          >
            <HiOutlineBuildingOffice2 />
            Квартира
          </TypeButton>
          <TypeButton
            type="button"
            $active={objectType === "private_house"}
            onClick={() => {
              setObjectType("private_house");
              setRoomType("");
            }}
          >
            <HiOutlineHomeModern />
            Частный дом
          </TypeButton>
        </TypeButtonsStage>
      </Field>

      <Grid>
        {objectType !== "" && (
          <Field $variant="compact">
            Выберите количество комнат
            <RoomButtons>
              <RoomButton type="button" $active={roomType === "1"} onClick={() => setRoomType("1")}>
                1
              </RoomButton>
              <RoomButton type="button" $active={roomType === "2"} onClick={() => setRoomType("2")}>
                2
              </RoomButton>
              <RoomButton type="button" $active={roomType === "3"} onClick={() => setRoomType("3")}>
                3
              </RoomButton>
              <RoomButton type="button" $active={roomType === "4_plus"} onClick={() => setRoomType("4_plus")}>
                4+
              </RoomButton>
            </RoomButtons>
          </Field>
        )}

        {hasRoomType && (
          <Field $variant="compact">
            Выберите количество точек
            <SliderWrap>
              <PointsValue>{effectivePoints} точек</PointsValue>
              <Slider
                type="range"
                min={minPoints}
                max={200}
                step={5}
                value={effectivePoints}
                onChange={(event) => setPoints(Number(event.target.value))}
              />
              <Hint>{minPoints} точек — 200 точек</Hint>
            </SliderWrap>
          </Field>
        )}
      </Grid>

      {showResult && hasFullInput ? (
        <Result>
          <Price>{resultText}</Price>
          <Hint>
            Расчет ориентировочный. Точную смету формируем после осмотра объекта и
            уточнения состава работ.
          </Hint>
        </Result>
      ) : null}
    </Wrap>
  );
}
