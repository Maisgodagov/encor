import styled from "styled-components";

const Page = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 48px 20px;
  background: linear-gradient(145deg, #f4f7ff 0%, #eef4ef 100%);
`;

const Card = styled.section`
  width: min(760px, 100%);
  background: #fff;
  border: 1px solid #dfe6f5;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(13, 35, 67, 0.08);
`;

const Title = styled.h1`
  font-size: clamp(30px, 6vw, 48px);
  line-height: 1.05;
  margin-bottom: 12px;
`;

const Text = styled.p`
  color: #394454;
  font-size: 18px;
  line-height: 1.55;
`;

export default function Home() {
  return (
    <Page>
      <Card>
        <Title>Encor</Title>
        <Text>
          Базовый SEO-ready лендинг на Next.js + TypeScript + styled-components.
          Следующий шаг: подключаем форму заявки и интеграцию с backend API.
        </Text>
      </Card>
    </Page>
  );
}
