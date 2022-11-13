import './App.css';
import {useState} from 'react';

function App() {
  const [load, setLoad] = useState(false);
  const [sum,setSum] = useState(false);
  const timer = () =>{
    setLoad(!load);
    setTimeout(()=>{
      setLoad(false);
      setSum(!sum);
    },4000);
  }
  return (
    //bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400
    //from-indigo-500 via-purple-500 to-pink-500
    //bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600
    //bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900
    //bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
    //bg-gradient-to-r from-rose-700 to-pink-600
    //bg-gradient-to-r from-sky-400 to-blue-500
    <div className="App flex-row justify-center h-screen w-full bg-gradient-to-r from-sky-400 to-blue-500 drop-shadow-lg">
      <button className='bg-gradient-to-r from-sky-400 to-blue-500 my-2 w-40 h-12 rounded-2xl text-center items-center border-blue-500 border-4 hover:border-sky-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-lg' onClick={()=>{timer()}}>
        <p className='font-Sono text-xl text-white font-extrabold'>Summarize</p>
      </button>
      <div className='SummaryBox h-[82%] flex justify-center'>
        <div className='flex-col justify-center h-full w-[85%] p-4 bg-white rounded-3xl text-center items-center drop-shadow-lg'>
          <div className={`loader justify-center scale-150 ${load?'flex':'hidden'}`}>
            <svg className='animate-spin' width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill="#555" fill-rule="evenodd" d="M11,16 C12.1045695,16 13,16.8954305 13,18 C13,19.1045695 12.1045695,20 11,20 C9.8954305,20 9,19.1045695 9,18 C9,16.8954305 9.8954305,16 11,16 Z M4.74123945,13 C6.12195133,13 7.24123945,14.1192881 7.24123945,15.5 C7.24123945,16.8807119 6.12195133,18 4.74123945,18 C3.36052758,18 2.24123945,16.8807119 2.24123945,15.5 C2.24123945,14.1192881 3.36052758,13 4.74123945,13 Z M16.3193286,13.5 C17.4238981,13.5 18.3193286,14.3954305 18.3193286,15.5 C18.3193286,16.6045695 17.4238981,17.5 16.3193286,17.5 C15.2147591,17.5 14.3193286,16.6045695 14.3193286,15.5 C14.3193286,14.3954305 15.2147591,13.5 16.3193286,13.5 Z M18.5,9.31854099 C19.3284271,9.31854099 20,9.99011387 20,10.818541 C20,11.6469681 19.3284271,12.318541 18.5,12.318541 C17.6715729,12.318541 17,11.6469681 17,10.818541 C17,9.99011387 17.6715729,9.31854099 18.5,9.31854099 Z M2.5,6 C3.88071187,6 5,7.11928813 5,8.5 C5,9.88071187 3.88071187,11 2.5,11 C1.11928813,11 0,9.88071187 0,8.5 C0,7.11928813 1.11928813,6 2.5,6 Z M17.7857894,5.20724734 C18.3380741,5.20724734 18.7857894,5.65496259 18.7857894,6.20724734 C18.7857894,6.75953209 18.3380741,7.20724734 17.7857894,7.20724734 C17.2335046,7.20724734 16.7857894,6.75953209 16.7857894,6.20724734 C16.7857894,5.65496259 17.2335046,5.20724734 17.7857894,5.20724734 Z M8,0 C9.65685425,0 11,1.34314575 11,3 C11,4.65685425 9.65685425,6 8,6 C6.34314575,6 5,4.65685425 5,3 C5,1.34314575 6.34314575,0 8,0 Z M15.5,3 C15.7761424,3 16,3.22385763 16,3.5 C16,3.77614237 15.7761424,4 15.5,4 C15.2238576,4 15,3.77614237 15,3.5 C15,3.22385763 15.2238576,3 15.5,3 Z"/>
            </svg>
          </div>
          <p className={`${sum ? 'flex':'hidden'}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? Lorem ipsum dolor sit 
            amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? Lorem ipsum dolor sit amet, consectetur 
            adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
