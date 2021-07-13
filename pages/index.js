import React from 'react'
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutComuns'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(propriedades){ 
  return( 

        <Box as='aside'> 
        <img src={`https://github.com/${propriedades.githubUser}.png`} style = {{ borderRadius: '8px'}} />
        <hr />
        <p> 
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
        </p> 
        <hr /> 
        <AlurakutProfileSidebarMenuDefault /> 
      </Box> 
  )
}


export default function Home() {
  const githubUser = 'MarjadeSordi'
  const pessoasFavoritas = ['omariosouto', 'juunegreiros', 
  'marcobrunodev', 
  'pedronauck','willianjusten', 
  'giggio', 
 ]
  const [comunidades, setComunidades ] = React.useState([{ 
    id: '1',
    title: 'Eu odeio acordar cedo', 
    img: 'https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg'}])

  return(
  <>
    <AlurakutMenu /> 
    <MainGrid> 
      <div className="profileArea" style={ {gridAreas: 'profileArea' }}>
      <ProfileSideBar githubUser={githubUser} /> 
      </div>
      <div className="welcomeArea" style={{ gridAreas: 'welcomeArea' }}>
        <Box > 
          <h1 className="title"> Bem Vindo(a)!  
          </h1>
          <OrkutNostalgicIconSet /> 
        </Box> 
        <Box> 
          <h2 className='subTitle'> O que você deseja fazer?  </h2>
          <form onSubmit={ function handleCriaComunidade(e){
            e.preventDefault();
            const dadosdoForm = new FormData(e.target)
            const comunidade = {
              id: new Date().toISOString(), 
              title : dadosdoForm.get('title'),
              img : dadosdoForm.get('img')
            }
            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas)
          } } >
          <div> 
            <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              aria-label="Qual vai ser o nome da sua comunidade?" 
              typo='text'
            />
          </div>
          <div> 
            <input 
              placeholder="Coloque uma url para ser usada como capa" 
              name="img" 
              aria-label="Coloque uma url para ser usada como capa" 
              typo='text'
            />
          </div>
          <button>  
            Criar Comunidade
          </button>
          </form>
        </Box>
      </div>

      <div className="profileRelationArea" style={{ gridAreas: 'profileRelationArea' }}>  
      <ProfileRelationsBoxWrapper > 
        <h2 className='smallTitle'>     Pessoas da Comunidade ({pessoasFavoritas.length})  </h2>
   
        <ul> 
        {pessoasFavoritas.map((pessoa) =>{
        return (
          <li key={pessoa}>
          <a href={`users/${pessoa}`}>
            <img src={`https://github.com/${pessoa}.png`} /> 
            <span> {pessoa} </span>
          </a>
          </li>
       ) }
          )}
      
      </ul>
      </ProfileRelationsBoxWrapper > 
      <ProfileRelationsBoxWrapper > 
        <h2 className='smallTitle'>    Minhas Comunidades ({comunidades.length})  </h2>
   
        <ul> 
        {comunidades.map((itemAtual) =>{
        return (
          <li key={itemAtual.id}>
          <a href={`users/${itemAtual.title}`} key={itemAtual.title}>
             <img src={itemAtual.img} />
            <span> {itemAtual.title} </span>
          </a>
          </li>
       ) }
          )} 
      
      </ul>
      </ProfileRelationsBoxWrapper > 
      </div>
  </MainGrid> 
  </>
   )
}
