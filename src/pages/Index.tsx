import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../sass/index.scss';
import { motion } from 'framer-motion';

interface LiquorItem {
  bgImg: string;
  discription: string;
  logoSrc: string;
}
interface LiquorData {
  Liquor: LiquorItem[];
}
interface NewsData {
  News: NewsItem[];
}
interface NewsItem {
  marker: string;
  content: string;
  date: string;
}
interface ResData {
  Liquor: LiquorItem[];
  News: NewsItem[];
}

const Index = () => {

  const [data, setData] = useState<ResData>({ Liquor: [], News: [] });
  const [fadeImgIndex, setFadeImgIndex] = useState(0)
  const fade = useRef(null);
  const fadeIndexArea = useRef<HTMLDivElement>(null);
  let fadeSection: any;
  let fadeIndex: any;
  let childrenArray: any;
  const img = ['/asset/bgi1.jpg', '/asset/bgi2.jpg', '/asset/bgi3.jpg'];

  useEffect(() => {
    const responsData = async () => {
      const res = await axios.get((process.env.PUBLIC_URL || '.')+'/data/data.json');
      setData(res.data);
      // console.log(res.data)

    }
    responsData();
    if (fade.current != null) {
      fadeSection = fade.current;
    }
    if (fadeIndexArea.current != null) {
      childrenArray = Array.from(fadeIndexArea.current.children);
      // console.log(childrenArray[0]); // 자식 엘리먼트들을 배열로 출력
    }
  }, [])

  let i = 0;
  useEffect(() => {
    const evnetListener = (i: number) => {
      fadeSection.style.opacity = 1;
      fadeSection.style.transition = 'all 2000ms';
      fadeSection.style.backgroundImage = `url(${ (process.env.PUBLIC_URL || '.')+img[i]})`;

      childrenArray[i].classList.add('active');
      
      setTimeout(() => {
        fadeSection.style.opacity = 0;
        if (i === 2) {
          childrenArray.forEach((element: HTMLDivElement, index: number) => {
            element.classList.remove('active');
          });
        }
        i++;
        evnetListener(i % 3);
      }, 2001)
    }
    if (fadeSection !== undefined) {
      evnetListener(0);
    }
    
  }, [data])


  const slideareas: string[] = ['down', 'up'];


  return (
    <div className="index-area">
      <section ref={fade}>
        <h1 className='intro-text'>
          Korea Culture,<br />
          Korea Tranditional Liquor
        </h1>

        <div className="fade-index-area" ref={fadeIndexArea} key={'fade-index-area'+1}>
          {
            img.map((v, i) => (
              <div className="fade-index" key={'fade-index-'+i}></div>
            ))
          }

        </div>
      </section>

      <section>
        <h1 className='intro-text'>
          Member Company
        </h1>
        <p>
          한국 전통주의 세계화를 위해<br />
          노력하는 전통주수출협의회<br />
          회원사입니다.
        </p>
        <a href="/" className='more'>more +</a>
        {
          slideareas.map((type) => (
            <div className={`slide-area ${type}`} key={'slide-'+type}>
              {data.Liquor.concat(data.Liquor).map((item, index) => (
                <div className="slide-item" key={'slide-item' + index} style={{ backgroundImage: `url(${(process.env.PUBLIC_URL || '.')}/asset/${item.bgImg})` }}>
                  <div className="dis">{item.discription}</div>
                  <a className="slide-logo" href='/'>
                    <img src={`${(process.env.PUBLIC_URL || '.')}/asset/${item.logoSrc}`} alt={'logo' + index} />
                  </a>
                </div>
              ))}
            </div>
          ))
        }
      </section>
      <section>
        <h2>News /  Notice</h2>
        <a href="/" className='more'>more +</a>
        <ul>
          {
            data.News.map((item, index) => (
              <li key={`news-${index}`}>
                <a href="/">
                  <span className="marker">{item.marker}</span>
                  <p className="news-content">{item.content}</p>
                  <span className="news-date">{item.date}</span>
                </a>
              </li>
            ))
          }

        </ul>
      </section>
      <section>
        <motion.div
          className='up-div'
          initial={{ opacity: 0, y: 500 }}
          whileInView={{ opacity: 1, y: 350 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}>
          <div className='text-box'>
            <h2>inquiry</h2>
            <p>
              전통주수출협의회와 함께 할 비즈니스 또는<br /> 제휴에 대한 문의를 남겨주세요.
            </p>
            <a href="/" className="more"> 문의하기 →</a>
          </div>
        </motion.div>
      </section>
      <footer>
        <h2>
          전통주수출협의회
        </h2>
        <ul>
          <li>
            <p>회장사 : ㈜한국애플리즈</p>
          </li>
          <li>
            <p>주소 : 경북 의성군 단촌면 후평리 69</p>
          </li>
          <li>
            <p>전화번호 : 054-834-7800</p>
          </li>
          <li>
            <p>Copyright ⓒ 전통주수출협의회 All rights reserved.</p>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Index