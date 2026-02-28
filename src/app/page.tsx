import styled from "styled-components";

const Page = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  background: radial-gradient(circle at 20% 20%, #f4f7ff 0%, #f5f8f3 45%, #eef2ff 100%);
`;

const Card = styled.section`
  width: min(680px, 100%);
  background: #fff;
  border-radius: 24px;
  padding: clamp(24px, 4vw, 40px);
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(28px, 5vw, 46px);
  line-height: 1.1;
`;

const Subtitle = styled.p`
  margin-top: 10px;
  color: #52607a;
  font-size: clamp(16px, 2vw, 18px);
`;

export default function Home() {
  return (
    <Page>
      <Card>
        <Title>Энкор</Title>
        <Subtitle>Сайт в разработке</Subtitle>
      </Card>
    </Page>
  );
}
