import { useNavigate } from 'react-router-dom';
import './style.css';
type propsType = {
  title: String|undefined
};
const Navbar = (props: propsType) => {
  const navigate = useNavigate();
  // const location = useLocation();
  return (
    <div className='w-full h-[50px] bg-[#2223265d]
    shadow-[0_1px_5px_0px_black] absolute top-0 text-white flex items-center px-5'>
     {window.history.state.idx > 0 && <button className='w-[40px] h-[40px] bg-[#d55f5f] rounded-3xl cursor-pointer hover:scale-[1.05]'
     onClick={() => {
        navigate(-1);
     }}>
     <i className="fa-solid fa-arrow-left"></i>
     </button>}
     <span className='mx-auto font-bold text-3xl pixelify-sans'>{props.title}</span>
     <span className=''></span>
      
      </div>
  )
}

export default Navbar;