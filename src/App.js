import './App.css';
import {useState} from 'react';
import axios from 'axios';
// import { useSpeechSynthesis } from 'react-speech-kit';

function App() {
  const [txt,setTxt] = useState("");
  const [summary,setSummary] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [loaded,setLoaded] = useState(false);

  let handleSubmit = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      let res = await axios.post("http://127.0.0.1:5000/",{
        url:txt
      });
      if (res.status===200){
        console.log(res.data.id);
        console.log("sent successfully");
      }
      const summaryResponse = await axios.get(`http://127.0.0.1:5000/data?id=${res.data.id}`);
      setSummary(summaryResponse.data.summary_text);
    } catch(err){
      console.log(err);
    } finally{
      setIsLoading(false);
      setLoaded(true);
    }
  }

  // const {speak} = useSpeechSynthesis();

  // let url = window.location.href;
  // console.log("URL of active tab:", url);

  // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  //   let activeTab = tabs[0];
  //   let activeTabUrl = activeTab.url;
  //   console.log(activeTabUrl);
  // });

  return (
    //bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400
    //from-indigo-500 via-purple-500 to-pink-500
    //bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600
    //bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900
    //bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
    //bg-gradient-to-r from-rose-700 to-pink-600
    //bg-gradient-to-r from-sky-400 to-blue-500
    <div className="App flex flex-col justify-evenly h-screen w-full bg-gradient-to-r from-sky-400 to-blue-500 drop-shadow-lg">
      <p className='text-7xl font-Lobster text-white mt-4'>SummUP</p>
      <div className='flex flex-col justify-center align-middle h-[80%] w-full text-center drop-shadow-lg'>
        {loaded ? (
          <div></div>
        ):(
          <form className='flex flex-col w-[85%] mx-auto justify-center h-1/5 bg-white rounded-3xl' onSubmit={handleSubmit}>
            <input value={txt} onChange={(e)=>setTxt(e.target.value)} className='w-full h-full rounded-3xl text-[1rem] overflow-auto' placeholder='Enter the URL of the web article you want to summarize...' style={{resize:"none", outline:"none", padding:"10px"}}></input>
            <div className='flex justify-center w-full'>
              <button className='bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold mt-2 mb-1 w-40 h-12 rounded-2xl text-center text-lg items-center border-blue-500 border-4 hover:border-sky-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-lg' type='submit'>
                Submit
              </button>
            </div>
          </form>
        )}
        {isLoading ? (
          <div className='flex flex-col justify-center mx-auto h-full'>
            {/* <div className='flex justify-center scale-150'>
              <svg className='animate-spin' width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill="#555" fill-rule="evenodd" d="M11,16 C12.1045695,16 13,16.8954305 13,18 C13,19.1045695 12.1045695,20 11,20 C9.8954305,20 9,19.1045695 9,18 C9,16.8954305 9.8954305,16 11,16 Z M4.74123945,13 C6.12195133,13 7.24123945,14.1192881 7.24123945,15.5 C7.24123945,16.8807119 6.12195133,18 4.74123945,18 C3.36052758,18 2.24123945,16.8807119 2.24123945,15.5 C2.24123945,14.1192881 3.36052758,13 4.74123945,13 Z M16.3193286,13.5 C17.4238981,13.5 18.3193286,14.3954305 18.3193286,15.5 C18.3193286,16.6045695 17.4238981,17.5 16.3193286,17.5 C15.2147591,17.5 14.3193286,16.6045695 14.3193286,15.5 C14.3193286,14.3954305 15.2147591,13.5 16.3193286,13.5 Z M18.5,9.31854099 C19.3284271,9.31854099 20,9.99011387 20,10.818541 C20,11.6469681 19.3284271,12.318541 18.5,12.318541 C17.6715729,12.318541 17,11.6469681 17,10.818541 C17,9.99011387 17.6715729,9.31854099 18.5,9.31854099 Z M2.5,6 C3.88071187,6 5,7.11928813 5,8.5 C5,9.88071187 3.88071187,11 2.5,11 C1.11928813,11 0,9.88071187 0,8.5 C0,7.11928813 1.11928813,6 2.5,6 Z M17.7857894,5.20724734 C18.3380741,5.20724734 18.7857894,5.65496259 18.7857894,6.20724734 C18.7857894,6.75953209 18.3380741,7.20724734 17.7857894,7.20724734 C17.2335046,7.20724734 16.7857894,6.75953209 16.7857894,6.20724734 C16.7857894,5.65496259 17.2335046,5.20724734 17.7857894,5.20724734 Z M8,0 C9.65685425,0 11,1.34314575 11,3 C11,4.65685425 9.65685425,6 8,6 C6.34314575,6 5,4.65685425 5,3 C5,1.34314575 6.34314575,0 8,0 Z M15.5,3 C15.7761424,3 16,3.22385763 16,3.5 C16,3.77614237 15.7761424,4 15.5,4 C15.2238576,4 15,3.77614237 15,3.5 C15,3.22385763 15.2238576,3 15.5,3 Z"/>
              </svg>
            </div> */}
            <div className="spinner-box w-64 h-64 flex justify-center items-center bg-transparent">
              <div className="blue-orbit leo"></div>
              <div className="green-orbit leo"></div>
              <div className="red-orbit leo"></div>
              <div className="white-orbit w1 leo"></div>
              <div className="white-orbit w2 leo"></div>
              <div className="white-orbit w3 leo"></div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center mx-auto h-auto w-[85%] items-center drop-shadow-lg'>
          </div>
        )}
        {loaded?(
          <div className='flex flex-col mx-auto h-auto w-[85%] items-center drop-shadow-lg'>
            <p className='p-2 text-lg bg-white rounded-3xl text-center'>{summary}</p>
            <div className='flex justify-center'>
              {/* <button onClick={()=>speak({text:txt})} className='flex justify-center bg-gradient-to-r from-sky-400 to-blue-500 mt-2 mb-1 w-40 h-12 rounded-2xl text-center items-center border-blue-500 border-4 hover:border-sky-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-lg'>
                <p className='font-Sono text-xl text-white font-semibold flex items-center text-center'>Listen</p>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.15838 13.9306C3.44537 12.7423 3.44537 11.2577 4.15838 10.0694C4.37596 9.70674 4.73641 9.45272 5.1511 9.36978L6.84413 9.03117C6.94499 9.011 7.03591 8.95691 7.10176 8.87788L9.17085 6.39498C10.3534 4.97592 10.9447 4.26638 11.4723 4.45742C12 4.64846 12 5.57207 12 7.41928L12 16.5807C12 18.4279 12 19.3515 11.4723 19.5426C10.9447 19.7336 10.3534 19.0241 9.17085 17.605L7.10176 15.1221C7.03591 15.0431 6.94499 14.989 6.84413 14.9688L5.1511 14.6302C4.73641 14.5473 4.37596 14.2933 4.15838 13.9306Z" fill="#FFFFFF"/>
                  <path d="M14.5355 8.46447C15.4684 9.39732 15.9948 10.6611 16 11.9803C16.0052 13.2996 15.4888 14.5674 14.5633 15.5076" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                  <path d="M18.6569 6.34314C20.1494 7.83572 20.9916 9.85769 20.9999 11.9685C21.0083 14.0793 20.182 16.1078 18.7012 17.6121" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button> */}
            </div>
          </div>
        ):(
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
