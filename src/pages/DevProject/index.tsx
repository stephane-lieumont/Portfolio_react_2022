import { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import Footer from '~/layout/Footer';
import './style.scss'
import Background from '~/components/Background';
import { PageProps } from '~/interfaces/Component.intf';
import { useNavigate, useParams } from 'react-router';
import { ProjectDevData } from '~/interfaces/Data.intf';
import { ProjectsDevData } from '~/datas/dev.projects.data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser'
import { firstLetterUpper } from '~/utils/formatString';
import Loader from '~/components/Loader';
import useScrollPosition from '~/hooks/useScrollPosition';
import { useAppSelector } from '~/store/main.store';

const DevProject: FunctionComponent<PageProps> = ({title = 'titre de la page'}) => {
  const params = useParams()

  const [imgLoaded, setImgLoaded] = useState<boolean>(false)
  const [dataProject, setDataProject] = useState<ProjectDevData>()
  const headerheigth = useAppSelector((state) => state.layoutSlice.headerHeigth)

  const navigate = useNavigate()
  const scrollPosition = useScrollPosition()
  

  useEffect(() => {
    const data = ProjectsDevData.find( item => item.hashName === params.params)
    if(!data) navigate('/page-introuvable') 
    
    setDataProject(data)

    document.title = title + ' ' + data?.title
    window.scrollTo(0,0)
  }, [title, params, navigate])

  const handleReturn = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
      <div className='page project-web' style={{ paddingTop: headerheigth + 30 + 'px' }} data-testid='page-project-web'>
        <div className='page__content'>
        { imgLoaded ? (
            <Background
              ligthen
              triangleProperties = {{
                top: `${1 + (scrollPosition / 90)}%`,
                rigth: '15%',
                rotate: '260deg',
                size: '90px',
                delayAnimation: 0
              }}
              pointsProperties = {{
                top: `${80 - (scrollPosition / 60)}%`,
                left: '90%',
                rotate: '145deg',
                size: '300px',
                delayAnimation:150
              }}
              circleProperties = {{
                top: `${85 - (scrollPosition / 50)}%`,
                rigth: '90%',
                size: '350px',
                delayAnimation: 300
              }}
            />  
          ) : (
            <Loader />
          ) }
          <section>

            <div className={`project__title reveal${ imgLoaded ? ' reveal--0' : '' }`}>
              <div className='project__title__return'>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} className='fa-return-btn' onClick={handleReturn} />
              </div>                
              <h2 className={`display1`}>{ dataProject?.title }</h2>
            </div>
            <div className='project__pitch limit-width-content'>
              <img
                onLoad={ () => setImgLoaded(true) }
                className={`reveal${ imgLoaded ? ' reveal--1' : '' }`}
                width="800" 
                src={dataProject?.imgFileProject} 
                alt={dataProject?.imgAlt}
              />
              <p className={`text--indent reveal${ imgLoaded ? ' reveal--2' : '' }`}>
                { parse(dataProject?.description ?? '') }
              </p>
            </div>
            <div className='project__release limit-width-content'>
              <h3 className={`reveal${ imgLoaded ? ' reveal--3' : '' }`}>Mission</h3>
              <div className='project__release__container'>
                <div className={`project__release__content reveal${ imgLoaded ? ' reveal--4' : '' }`}>
                  <p>{ parse(dataProject?.mission ?? '') } :</p>
                  <ul className='list-style'>
                    { dataProject?.missionSteps.map((item, index) => (
                      <li key={`mision-${index}`}>{ parse(item) }</li>
                    ))}
                  </ul>
                </div>
                <ul className={`icon-custom__list reveal${ imgLoaded ? ' reveal--4' : '' }`}>
                  { dataProject?.technos.map((item, index) => (
                    <li key={`techno-${index}`} className="icon-custom"><i className={`icon-custom__container icon-custom--${ item.toLowerCase() }`}></i><span>{firstLetterUpper(item)}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>       
      <Footer />
    </div>
  );
}

export default DevProject;