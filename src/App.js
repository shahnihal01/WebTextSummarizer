import './App.css';
import {useState, useRef} from 'react';
import axios from 'axios';

function App() {
  const [txt,setTxt] = useState("");
  const [summary,setSummary] = useState("");
  const [plain,setPlain] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const [scrapeErr,setScrapeErr] = useState(false);
  const [shrink,setShrink] = useState(0);

  function isUrl(input) {
    // Regular expression for URL pattern
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
    // Test if input matches URL pattern
    return urlRegex.test(input);
  }

  let handleSubmit = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      if(isUrl(txt)===true){
        console.log("input is url")
        let res = await axios.post("http://127.0.0.1:5000/url",{
          url:txt
        });
        if (res.status===201){
          console.log("url sent successfully");
        }
        const summaryResponse = await axios.get(`http://127.0.0.1:5000/data?id=${res.data.id}`);
        setSummary(summaryResponse.data.summary_text);
        setPlain(summaryResponse.data.plain_text);
        const plainLen = summaryResponse.data.plain_text.split(" ").length;
        const sumLen = summaryResponse.data.summary_text.split(" ").length;
        setShrink((sumLen/plainLen)*100);
        if(summaryResponse.data.plain_text==="The URL for the article cannot be scraped. Please enter the text"){
          setScrapeErr(true);
        }
      }
      else {
        console.log("input is text")
        let res = await axios.post("http://127.0.0.1:5000/text",{
          plain_text:txt
        });
        if (res.status===201){
          console.log("text sent successfully");
        }
        const summaryResponse = await axios.get(`http://127.0.0.1:5000/data?id=${res.data.id}`);
        setSummary(summaryResponse.data.summary_text);
        setPlain(summaryResponse.data.plain_text);
        const plainLen = summaryResponse.data.plain_text.split(" ").length;
        const sumLen = summaryResponse.data.summary_text.split(" ").length;
        setShrink((sumLen/plainLen)*100);
      }
    } catch(err){
      console.log(err);
    } finally{
      setIsLoading(false);
      setLoaded(true);
    }
  }

  //TextArea Auto-resizing
  const ref = useRef(null);

  const handleInput = (e) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };

  //Text to Speech
  const [speaking, setSpeaking] = useState(false);

  const speakText = () => {
    if (!speaking && summary) {
      const utterance = new window.SpeechSynthesisUtterance(summary);
      setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const redToHome =()=>{
    setIsLoading(false);
    setLoaded(false);
    setScrapeErr(false);
    setTxt("");
  }

  return (
    <div className="App flex flex-col justify-evenly h-screen w-full bg-gradient-to-r from-sky-400 to-blue-500 drop-shadow-lg">
      <p className='text-7xl font-Lobster text-white mt-4'>SummUP</p>
      <div className='flex flex-col justify-center align-middle h-[80%] w-full text-center drop-shadow-lg'>
        {loaded ? (
          <div className='flex flex-col bg-white rounded-3xl mx-auto h-auto w-[85%] max-h-[100%] drop-shadow-lg overflow-auto'>
            {scrapeErr?(
              <div>
                <p className='p-2 text-xl'>{plain}</p>
                <div className='flex justify-center'>
                  <button className='flex justify-center bg-gradient-to-r from-sky-400 to-blue-500 mt-2 mb-1 w-40 h-12 rounded-2xl text-center items-center border-blue-500 border-4 hover:border-sky-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-lg' onClick={redToHome}>
                    <p className='text-xl text-white font-semibold flex items-center text-center'>Enter Text</p>
                  </button>
                </div>
              </div>
            ):(
              <div>
              <p className='p-2 text-base text-justify overflow-scroll'>{summary}</p>
              <p className='p-2 text-slate-600'>Summary Shrinkage {Math.floor(shrink)}%</p>
              <div className='flex justify-center'>
                <button className='flex justify-center bg-gradient-to-r from-sky-400 to-blue-500 mt-2 mb-1 w-40 h-12 rounded-2xl text-center items-center border-blue-500 border-4 hover:border-sky-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-lg' onClick={speakText} disabled={speaking}>
                  <p className='text-xl text-white font-semibold flex items-center text-center'>{speaking ? "Speaking..." : "Listen"}</p>
                </button>
              </div>
            </div>
            )}
          </div>
        ):(
          <div className='flex flex-col justify-center w-full h-full'>
            {isLoading ? (
              <div className='flex flex-col justify-center mx-auto h-full'>
                <div className="spinner-box w-72 h-72 flex justify-center items-center bg-transparent">
                  <div className="blue-orbit leo"></div>
                  <div className="green-orbit leo"></div>
                  <div className="red-orbit leo"></div>
                  <div className="white-orbit w1 leo"></div>
                  <div className="white-orbit w2 leo"></div>
                  <div className="white-orbit w3 leo"></div>
                </div>
                <p className='text-white text-lg'>Loading... This may take upto 2-3 minutes</p>
              </div>
            ) : (
              <div className='flex flex-col justify-center mx-auto h-auto w-full items-center drop-shadow-lg'>
                <form className='flex flex-col w-[90%] mx-auto justify-center max-h-full rounded-3xl' onSubmit={handleSubmit}>
                  <textarea ref={ref} onInput={handleInput} value={txt} onChange={(e)=>setTxt(e.target.value)} className='w-full h-full rounded-3xl text-[1rem] overflow-auto text-ellipsis' placeholder='Enter the URL of the web article or paste content of web article...' style={{resize:"none", outline:"none", padding:"10px", minHeight:"75px", maxHeight:"400px"}}></textarea>
                  <div className='flex justify-center w-full'>
                    <button className='bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold mt-2 mb-1 w-40 h-12 rounded-2xl text-center text-lg items-center border-blue-500 border-4 hover:border-sky-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-lg' type='submit'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
