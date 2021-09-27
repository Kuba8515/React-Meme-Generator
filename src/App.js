import './App.css';
import { useEffect, useState } from 'react';
import Button from './Button';
import Heading from './Heading';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [url, setUrl] = useState(
    'https://api.memegen.link/images/fine/Stay_calm/and_choose.jpg?token=ucqea4c43dnif4yhhz3x',
  );
  const [customMeme, setCustomMeme] = useState('');
  const [memeTemplate, setMemeTemplate] = useState([]);

  // Fetch data from url => setMemeTemplate
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates');
        const json = await response.json();
        setMemeTemplate(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const changeTopText = (event) => {
    setTopText(event.currentTarget.value);
  };
  const changeBottomText = (event) => {
    setBottomText(event.currentTarget.value);
  };
  const changeCustomMeme = (event) => {
    setCustomMeme(event.currentTarget.value);
  };

  const changedTopText = topText
    .replace(/\?/g, '~q')
    .replace(/\//g, '~s')
    .replace(/#/g, '~h');

  const changedBottomText = bottomText
    .replace(/\?/g, '~q')
    .replace(/\//g, '~s')
    .replace(/#/g, '~h');

  const generateClick = () => {
    setUrl(
      `https://api.memegen.link/images/${customMeme}/${changedTopText}/${changedBottomText}.jpg`,
    );
  };

  // Create download function with async
  async function downloadClick() {
    const image = await fetch(url);
    const newBlob = await image.blob();
    const imageUrl = URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = customMeme + '_' + topText + '_' + bottomText;
    link.click();
  }

  return (
    <div className="App">
      <Heading />
      <div className="Generator">
        <div className="Grid1">
          <div>
            <label htmlFor="customMeme">Pick your meme: </label>
            <select
              id="customMeme"
              value={customMeme}
              onChange={changeCustomMeme}
            >
              {memeTemplate.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>
              <label htmlFor="topText">Top-text: </label>
              <input id="topText" onChange={changeTopText} />
            </p>
            <p>
              <label htmlFor="bottomText">Bottom-text: </label>
              <input id="bottomText" onChange={changeBottomText} />
            </p>
          </div>

          <p>
            <div>
              <p>
                <Button
                  name="Generate"
                  onClick={(event) => generateClick(event)}
                >
                  Generate
                </Button>
              </p>
              <p>
                <Button
                  name="Download"
                  onClick={(event) => downloadClick(event)}
                >
                  Download
                </Button>
              </p>
            </div>
          </p>
        </div>
        <div>
          <img src={url} alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
