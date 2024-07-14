import React from 'react';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';

interface Props{
  bg?: boolean;
  border?: boolean;
  text?:string;
  icon?:React.ReactNode
  func?:()=>void
  to?:string
}

export const Buttons:React.FC<Props> = ({bg, border, text, icon, func, to}) => {

  const hover ={
      scale:1.1,
      backgroundColor: bg ? '#ebf6f2' :'rgba(255, 252, 253, 0.05)'
    }

  const buttonContent = (
    <motion.button
        onClick={func}
        whileHover={hover}
        className={`flex items-center gap-[10px] text-title2 font-semibold py-[10px] ${icon ?'px-[20px]':'px-[30px]'} ${bg &&'bg-pink-Light text-black-Darker'} w-fit ${border && 'border-[1px] border-pink-Light'} rounded-full`}>
          {icon &&
            <div className={`p-[5px] ${bg ? 'bg-black-Darker text-pink-Light' :'bg-pink-Light text-black-Darker'} rounded-full text-caption`}>
              {icon}
            </div>}
        {text}
      </motion.button>
  )  

  return to ? (
    <Link to={to}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
}

export const CircleIconButtons:React.FC<Props> = ({func, icon, to}) => {

  const hover ={
      scale:1.2,
      backgroundColor: 'rgba(255, 252, 253, 0.05)'
    }

  return (
    <motion.button
      onClick={func}
      whileHover={hover}
      className={`p-[5px] border-[1px] border-pink-Light  text-pink-Light rounded-full text-caption`}>
        <a href={to}>
            {icon}
        </a>
    </motion.button>

  )
}
