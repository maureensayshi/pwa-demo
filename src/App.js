
import { useState, useEffect } from 'react';
import styled from 'styled-components';

function App() {
  const [promptObj, setPromptObj] = useState(null);
  const [isInstallSuccess, setIsInstallSuccess] = useState(false);

  const showPrompt = () => promptObj.prompt();

  useEffect(() => {
    function storePrompt(e) {
      setPromptObj(e);
    }
    window.addEventListener("beforeinstallprompt", storePrompt);
    return () => window.removeEventListener("beforeinstallprompt", storePrompt);
  }, []);

  useEffect(() => {
    if (promptObj) {  
      promptObj?.userChoice.then(function(choiceResult) {
        // choiceResult.outcome either "accepted" or "dismissed"
        if (choiceResult.outcome === 'accepted') setIsInstallSuccess(true);
      });
    }
  }, [promptObj]);

  return (
   <Wrapper>
     <Title>Welcome to PWA Playground <Icon src="https://img.icons8.com/ios/250/000000/light-on.png" /></Title>
     <Subtitle>Enjoy PWA in 5 steps</Subtitle>
     <StepsWrapper>
        <StepWrapper>
          <StepTitle>STEP 1</StepTitle>
          <StepSubtitle>Cutomize manifest.json</StepSubtitle>
          <Content>1. 修改 name & short name</Content>
          <Content>2. 放上你想用的 icons，記得要是 192 和 512 尺寸</Content>
          <Content>3. 調整你的 display mode 來測試不同的 PWA 屏幕呈現</Content>
        </StepWrapper>
        <StepWrapper>
          <StepTitle>STEP 2</StepTitle>
          <StepSubtitle>Install with A2HS method</StepSubtitle>
          <Content>1. 若使用 Chrome 的桌機或手機，會出現安裝按鈕</Content>
          {promptObj && !isInstallSuccess && <A2HSButtonWrapper><A2HSButton onClick={showPrompt}>加入主畫面</A2HSButton></A2HSButtonWrapper>}
          {isInstallSuccess && '安裝成功'}
          <Content>2. 若使用 Safari 手機，自行從側邊欄選項點擊「加入主畫面」</Content>
        </StepWrapper>
        <StepWrapper>
          <StepTitle>STEP 3</StepTitle>
          <StepSubtitle>Cache files</StepSubtitle>
        </StepWrapper>
        <StepWrapper>
          <StepTitle>STEP 4</StepTitle>
          <StepSubtitle>Try push notification</StepSubtitle>
        </StepWrapper>
        <StepWrapper>
          <StepTitle>STEP 5</StepTitle>
          <StepSubtitle>Offer offline experience</StepSubtitle>
        </StepWrapper>
     </StepsWrapper>
   </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 0;
  padding: 20px;
  max-width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #f4f3ee;
  font-family: 'Lobster', cursive;
  font-family: 'Open Sans', sans-serif;
`;

const Title = styled.div`
  font-size: 64px;
  font-weight: 600;
  color: #463f3a;

  @media (max-width: 768px) {
    font-size: 29px;
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;

  @media (max-width: 768px) {
    width: 27px;
    height: 27px;
  }
`;

const Subtitle = styled.div`
  font-size: 36px;
  color: #8a817c;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 21px;
  }
`;

const StepsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 400px);
  gap: 15px 15px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  background: #fff;
  border-radius: 25px;
  min-height: 400px;
  padding: 15px 40px;
`;

const StepTitle = styled.div`
  font-size: 23px;
  font-weight: 700;
  color: #463f3a;
  letter-spacing: 2px;
`;

const StepSubtitle = styled.div`
  font-size: 19px;
  font-weight: 500;
  color: #463f3a;
  margin-bottom: 30px;
`;

const Content = styled.div`
  color: #000;
  font-size: 17px;
  margin: 5px 0;
`;

const A2HSButtonWrapper = styled.div`
  margin: 10px 0 15px 15px;
`;

const A2HSButton = styled.button`
  display: inline-block;
  width: 150px;
  border: none;
  border-radius: 40px;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #e0afa0;
  color: #ffffff;
  font-size: 17px;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
`;